import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { STAR_WARS_EPISODE } from '../entities/episode.entity';

export class CreateEpisodeDto {
  @IsNotEmpty()
  @IsEnum(STAR_WARS_EPISODE)
  name: STAR_WARS_EPISODE;

  @IsOptional()
  @IsUUID(4, { each: true })
  characterIds?: string[];
}
