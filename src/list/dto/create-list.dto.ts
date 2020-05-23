import { IsNotEmpty, IsString } from "class-validator";
import { ICreateListDto } from '@/models/list/dto/list.dto';

export class CreateListDto implements ICreateListDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
}
