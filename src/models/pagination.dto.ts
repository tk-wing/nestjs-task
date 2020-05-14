import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IsOptional, IsNumber　} from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto implements IPaginationOptions {
  @IsOptional()
  @Transform(limit => parseInt(limit))
  @IsNumber()
  limit = 15;

  @IsOptional()
  @Transform(page => parseInt(page))
  @IsNumber()
  page = 1;
}
