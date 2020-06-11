import { IUpdateListDto } from '@/models/list/dto/list.dto';
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateListDto implements IUpdateListDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
}
