import {
  IsNotEmpty,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { Priority, Status } from '../types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'My Task Title',
    description: 'Title of the task',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title: string = 'A new task';

  @ApiProperty({
    example: 'Detailed description of the task',
    description: 'Description of the task',
    minLength: 10,
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description: string = 'A new description';

  @ApiPropertyOptional({
    enum: Status,
    default: Status.PENDING,
    description: 'Current status of the task',
  })
  @IsOptional()
  @IsEnum(Status, {
    message: 'Status must be one of: pending, progress, completed, cancelled',
  })
  status?: Status = Status.CREATED;

  @ApiPropertyOptional({
    enum: Priority,
    default: Priority.MEDIUM,
    description: 'Priority level of the task',
  })
  @IsOptional()
  @IsEnum(Priority, {
    message: 'Priority must be one of: low, medium, high',
  })
  priority?: Priority = Priority.MEDIUM;
}
