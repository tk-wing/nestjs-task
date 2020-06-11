import { ICreateListDto } from '@/models/list/dto/list.dto';
import { IsNotEmpty, IsString } from "class-validator";

export class CreateListDto implements ICreateListDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
}
