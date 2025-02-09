export interface IPaginatorResult<T> {
  items: T[];
  hasMore: boolean;
  total: number;
}

export interface IPaginatorRequest {
  pageIndex: number;
  pageSize: number;
}

export interface ISearchPaginatedRequest {
  searchInput?: string | null;
  paginatedRequest: IPaginatorRequest;
}
