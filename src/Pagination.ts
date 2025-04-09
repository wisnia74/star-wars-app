export class Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;

  constructor(page: number, perPage: number, total: number) {
    this.page = page;
    this.perPage = perPage;
    this.total = total;
    this.totalPages = Math.ceil(total / perPage);
  }
}
