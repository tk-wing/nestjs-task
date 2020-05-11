import { Repository } from 'typeorm';

export default abstract class Service<T> {
  constructor(
    protected repository: Repository<T>
  ){}
}
