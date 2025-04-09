import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/Pagination';
import { CreatePlanetResponseDto } from './create-planet.dto';

export class ReadPlanetsResponseDto {
  @ApiProperty({ type: Pagination })
  pagination: Pagination;

  @ApiProperty({ type: [CreatePlanetResponseDto] })
  data: CreatePlanetResponseDto[];
}
