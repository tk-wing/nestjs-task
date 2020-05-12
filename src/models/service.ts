import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export default abstract class Service<T> {
  constructor(
    protected repository: Repository<T>
  ){}
}
