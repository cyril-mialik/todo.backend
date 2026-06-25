import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusEntity } from './entities/status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(StatusEntity)
    private readonly priorityRepository: Repository<StatusEntity>,
  ) {}

  async findAll(): Promise<StatusEntity[]> {
    return await this.priorityRepository.find();
  }

  async findById(id: number): Promise<StatusEntity> {
    const priority = await this.priorityRepository.findOne({
      where: { id },
    });

    if (!priority) {
      throw new NotFoundException("There's no such status");
    }

    return priority;
  }
}
