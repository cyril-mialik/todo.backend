import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DEFAULT_STATUS, STATUSES } from '../constants';

export class InitStatus1782407030322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Создаем таблицу statuses
    await queryRunner.createTable(
      new Table({
        name: 'statuses',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
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
      CREATE INDEX idx_statuses_name ON statuses(name);
    `);

    // 3. Вставляем статусы (с явным указанием id, чтобы быть уверенным)
    const statuses = [
      { name: STATUSES.CREATED, id: 1 },
      { name: STATUSES.PROGRESS, id: 2 },
      { name: STATUSES.COMPLETED, id: 3 },
      { name: STATUSES.CANCELLED, id: 4 },
    ];

    for (const status of statuses) {
      await queryRunner.query(
        `
          INSERT INTO statuses (id, name, created_at, updated_at)
          VALUES ($1, $2, NOW(), NOW())
          ON CONFLICT (name) DO NOTHING;
        `,
        [status.id, status.name],
      );
    }

    // 4. Добавляем CHECK constraint
    await queryRunner.query(`
      ALTER TABLE statuses
      ADD CONSTRAINT chk_statuses_name
      CHECK (name IN ('${STATUSES.CREATED}', '${STATUSES.PROGRESS}', '${STATUSES.COMPLETED}', '${STATUSES.CANCELLED}'));
    `);

    // 5. Проверяем, существует ли таблица tasks
    const hasTasksTable = await queryRunner.hasTable('tasks');

    if (hasTasksTable) {
      // Проверяем, существует ли колонка status_id
      const hasStatusColumn = await queryRunner.hasColumn('tasks', 'status_id');

      if (!hasStatusColumn) {
        // Добавляем колонку status_id в tasks
        await queryRunner.query(`
          ALTER TABLE tasks ADD COLUMN status_id INTEGER;
        `);

        // Устанавливаем статус по умолчанию (created)
        await queryRunner.query(`
          UPDATE tasks
          SET status_id = (SELECT id FROM statuses WHERE name = '${DEFAULT_STATUS}')
          WHERE status_id IS NULL;
        `);

        // Добавляем внешний ключ
        await queryRunner.query(`
          ALTER TABLE tasks
          ADD CONSTRAINT fk_tasks_status
          FOREIGN KEY (status_id) REFERENCES statuses(id)
          ON DELETE SET NULL;
        `);

        // Добавляем индекс
        await queryRunner.query(`
          CREATE INDEX idx_tasks_status_id ON tasks(status_id);
        `);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем внешний ключ, если есть
    await queryRunner.query(`
      ALTER TABLE tasks DROP CONSTRAINT IF EXISTS fk_tasks_status;
    `);

    // Удаляем колонку, если есть
    const hasStatusColumn = await queryRunner.hasColumn('tasks', 'status_id');
    if (hasStatusColumn) {
      await queryRunner.query(`
        ALTER TABLE tasks DROP COLUMN status_id;
      `);
    }

    // Удаляем таблицу statuses
    await queryRunner.dropTable('statuses', true, true, true);
  }
}
