import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty({ type: Number, default: 1, required: true })
  page: number;

  @ApiProperty({ type: Number, default: 10, required: true })
  perPage: number;

  @ApiProperty({ type: Number, default: 10, required: true })
  total: number;

  @ApiProperty({ type: Number, default: 1, required: true })
  totalPages: number;

  constructor(page: number, perPage: number, total: number) {
    this.page = page;
    this.perPage = perPage;
    this.total = total;
    this.totalPages = Math.ceil(total / perPage);
  }
}
