import { IListEntity } from '@/models/list/list.model';
export type  IExistCondition<T> = {
  [K in keyof T]: T[K]
}
