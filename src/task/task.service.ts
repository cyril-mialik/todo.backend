import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { DEFAULT_PRIORITY, DEFAULT_STATUS } from 'src/common/constants';
import { PriorityEntity } from 'src/priority/entities/priotiry.entity';
import { StatusEntity } from 'src/status/entities/status.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,

    @InjectRepository(PriorityEntity)
    private readonly priorityRepository: Repository<PriorityEntity>,

    @InjectRepository(StatusEntity)
    private readonly statusRepository: Repository<StatusEntity>,
  ) {}

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepository.find({
      relations: { priority: true, status: true },
    });
  }

  async findById(id: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: { priority: true, status: true },
    });

    if (!task) {
      throw new NotFoundException("There's no such task");
    }

    return task;
  }

  async create(dto: CreateTaskDto): Promise<TaskEntity> {
    const task = this.taskRepository.create(dto);

    task.priority ??= await this.priorityRepository.findOne({
      where: { name: DEFAULT_PRIORITY },
    });

    task.status ??= await this.statusRepository.findOne({
      where: { name: DEFAULT_STATUS },
    });

    return await this.taskRepository.save(task);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<TaskEntity> {
    const task = await this.findById(id);

    Object.assign(task, dto);
    await this.taskRepository.save(task);

    return task;
  }

  async delete(id: string): Promise<TaskEntity> {
    const task = await this.findById(id);

    await this.taskRepository.remove(task);

    return task;
  }
}
