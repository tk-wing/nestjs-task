import { IsNotEmpty, IsEnum } from "class-validator";
import { TaskStatus } from "../../models/task/task.model";
import { IUpdateTaskStatusDto } from '@/models/task/dto/task.dto';


export class UpdateTaskStatusDto implements IUpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status!: TaskStatus;
}
