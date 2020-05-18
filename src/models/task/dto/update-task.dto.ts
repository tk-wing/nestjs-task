import { IsNotEmpty, IsOptional, IsString, IsDate, IsInt } from "class-validator";
import { Type, Transform } from "class-transformer";

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsOptional()
  @Transform(listId => parseInt(listId))
  @IsInt()
  listId!: number

  @IsOptional()
  @Type( () => Date)
  @IsDate()
  @IsNotEmpty()
  expiredAt!: Date;
}
