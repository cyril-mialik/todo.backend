import {
  IsNotEmpty,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DEFAULT_STATUS } from 'src/common/constants/status';

export class CreateTaskDto {
  @ApiProperty({
    type: String,
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
    type: String,
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
    type: String,
    description: 'Current status of the task',
  })
  @IsOptional()
  @IsNumber()
  statusId?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Priority level of the task',
  })
  @IsOptional()
  @IsNumber()
  priorityId?: number;
}
