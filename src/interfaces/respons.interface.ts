export interface IPagination {
  currentPage: number;
  limit: number;
  skip: number;
  totalPages?: number;
  totalDocuments?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  nextPage?: number;
  prevPage?: number;
}
