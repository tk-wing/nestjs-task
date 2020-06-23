export interface IPaginationOption {
  limit: number;
  page: number;
}

interface IPaginationMetaData {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
interface IPaginationResponse<T> {
  items: T[];

}

export class Pagination<T> implements IPaginationResponse<T>, IPaginationMetaData {
  items: T[] = [];
  itemCount = 0;
  totalItems = 0;
  itemsPerPage = 0;
  totalPages = 0;
  currentPage = 0;

  setMetaData(data: IPaginationMetaData){
    this.itemCount = data.itemCount;
    this.totalItems = data.totalItems;
    this.itemsPerPage = data.itemsPerPage;
    this.totalPages = data.totalPages;
    this.currentPage = data.currentPage;
  }

}
