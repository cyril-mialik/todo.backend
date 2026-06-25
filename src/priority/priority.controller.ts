import { Controller, Get, Param } from '@nestjs/common';
import { PriorityService } from './priority.service';

@Controller('priorities/v1')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Get()
  findAll() {
    return this.priorityService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.priorityService.findById(+id);
  }
}
