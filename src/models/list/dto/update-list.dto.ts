import { IsNotEmpty, IsString } from "class-validator";

export class UpdateListDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
}
