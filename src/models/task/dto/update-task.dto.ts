import { IsNotEmpty, IsOptional, IsEnum, IsString } from "class-validator";
import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status!: TaskStatus;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  expiredAt!: Date;
}
