export interface IPaginationOption {
  limit: number;
  page: number;
}

export interface IPaginationMetaData {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IPaginationResponse<T> {
  items: T[];
  meta: IPaginationMetaData;
}
