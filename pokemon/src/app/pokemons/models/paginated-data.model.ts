export interface PaginatedData<T> {
  data: T[];
  offset: number;
  limit: number;
}
