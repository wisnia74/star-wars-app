import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/Pagination';
import { CreateEpisodeResponseDto } from './create-episode.dto';

export class ReadEpisodesResponseDto {
  @ApiProperty({ type: Pagination })
  pagination: Pagination;

  @ApiProperty({ type: [CreateEpisodeResponseDto] })
  data: CreateEpisodeResponseDto[];
}
