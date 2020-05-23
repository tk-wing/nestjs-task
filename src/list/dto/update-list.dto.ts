import { IsNotEmpty, IsString } from "class-validator";
import { IUpdateListDto } from '@/models/list/dto/list.dto';

export class UpdateListDto implements IUpdateListDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
}
