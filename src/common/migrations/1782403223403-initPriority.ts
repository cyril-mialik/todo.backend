import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { PRIORITIES } from '../constants';

export class InitPriority1782403223403 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Создаем таблицу priorities
    await queryRunner.createTable(
      new Table({
        name: 'priorities',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '128',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // 2. Добавляем индекс
    await queryRunner.query(`
      CREATE INDEX idx_priorities_name ON priorities(name);
    `);

    // 3. Вставляем приоритеты
    const priorities = [PRIORITIES.LOW, PRIORITIES.MEDIUM, PRIORITIES.HIGH];

    for (const name of priorities) {
      await queryRunner.query(
        `
        INSERT INTO priorities (name, created_at, updated_at)
        VALUES ($1, NOW(), NOW())
        ON CONFLICT (name) DO NOTHING;
        `,
        [name],
      );
    }

    // 4. Добавляем CHECK constraint
    await queryRunner.query(`
      ALTER TABLE priorities
      ADD CONSTRAINT chk_priorities_name
      CHECK (name IN ('${PRIORITIES.LOW}', '${PRIORITIES.MEDIUM}', '${PRIORITIES.HIGH}'));
    `);

    // 5. Проверяем, существует ли таблица tasks
    const hasTasksTable = await queryRunner.hasTable('tasks');

    if (hasTasksTable) {
      // Добавляем колонку priority_id в tasks
      await queryRunner.query(`
        ALTER TABLE tasks ADD COLUMN priority_id INTEGER;
      `);

      // Устанавливаем приоритет по умолчанию (medium)
      await queryRunner.query(`
        UPDATE tasks
        SET priority_id = (SELECT id FROM priorities WHERE name = 'medium')
        WHERE priority_id IS NULL;
      `);

      // Добавляем внешний ключ
      await queryRunner.query(`
        ALTER TABLE tasks
        ADD CONSTRAINT fk_tasks_priority
        FOREIGN KEY (priority_id) REFERENCES priorities(id)
        ON DELETE SET NULL;
      `);

      // Добавляем индекс
      await queryRunner.query(`
        CREATE INDEX idx_tasks_priority_id ON tasks(priority_id);
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем внешний ключ, если есть
    await queryRunner.query(`
      ALTER TABLE tasks DROP CONSTRAINT IF EXISTS fk_tasks_priority;
    `);

    // Удаляем колонку, если есть
    await queryRunner.query(`
      ALTER TABLE tasks DROP COLUMN IF EXISTS priority_id;
    `);

    // Удаляем таблицу priorities
    await queryRunner.dropTable('priorities', true, true, true);
  }
}
