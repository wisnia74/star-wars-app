import { STAR_WARS_EPISODE } from '@episodes/entities/episode.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { CreateEpisodeResponseDto } from './create-episode.dto';

export class UpdateEpisodeRequestDto {
  @ApiProperty({ type: String, enum: STAR_WARS_EPISODE, required: false })
  @IsNotEmpty()
  @IsEnum(STAR_WARS_EPISODE)
  name?: STAR_WARS_EPISODE;

  @ApiProperty({ type: [String], format: 'uuid', required: false })
  @IsOptional()
  @IsUUID(4, { each: true })
  characterIds?: string[];
}

export class UpdateEpisodeResponseDto extends CreateEpisodeResponseDto {}
