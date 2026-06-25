import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriorityEntity } from './entities/priotiry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PriorityService {
  constructor(
    @InjectRepository(PriorityEntity)
    private readonly priorityRepository: Repository<PriorityEntity>,
  ) {}

  async findAll(): Promise<PriorityEntity[]> {
    return await this.priorityRepository.find();
  }

  async findById(id: number): Promise<PriorityEntity> {
    const priority = await this.priorityRepository.findOne({
      where: { id },
    });

    if (!priority) {
      throw new NotFoundException("There's no such priority");
    }

    return priority;
  }
}
