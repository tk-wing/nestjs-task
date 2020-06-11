import { IUpdateTaskStatusDto } from '@/models/task/dto/task.dto';
import { IsEnum, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../../models/task/task.model";


export class UpdateTaskStatusDto implements IUpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status!: TaskStatus;
}
