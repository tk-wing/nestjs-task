import { IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IPaginationOption } from '@/models/types/pagination';

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
