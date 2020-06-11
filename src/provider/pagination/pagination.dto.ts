import { IPaginationOption } from '@/models/types/pagination';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export class PaginationDto implements IPaginationOption, IPaginationOptions {
  @IsOptional()
  @Transform(limit => parseInt(limit))
  @IsNumber()
  limit = 15;

  @IsOptional()
  @Transform(page => parseInt(page))
  @IsNumber()
  page = 1;
}
