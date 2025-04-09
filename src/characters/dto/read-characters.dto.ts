import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/Pagination';
import { CreateCharacterResponseDto } from './create-character.dto';

export class ReadCharactersResponseDto {
  @ApiProperty({ type: Pagination, required: true })
  pagination: Pagination;

  @ApiProperty({ type: [CreateCharacterResponseDto], required: true })
  data: CreateCharacterResponseDto[];
}
