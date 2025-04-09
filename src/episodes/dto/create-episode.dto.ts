import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { STAR_WARS_EPISODE } from '../entities/episode.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateCharacterResponseDto } from '@characters/dto/create-character.dto';

export class CreateEpisodeRequestDto {
  @ApiProperty({ type: String, enum: STAR_WARS_EPISODE })
  @IsNotEmpty()
  @IsEnum(STAR_WARS_EPISODE)
  name: STAR_WARS_EPISODE;

  @ApiProperty({ type: [String], format: 'uuid', required: false })
  @IsOptional()
  @IsUUID(4, { each: true })
  characterIds?: string[];
}

export class CreateEpisodeResponseDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty({ type: String, enum: STAR_WARS_EPISODE })
  name: STAR_WARS_EPISODE;

  @ApiProperty({
    type: () => [OmitType(CreateCharacterResponseDto, ['episodes', 'planet'])],
  })
  characters: Omit<CreateCharacterResponseDto, 'episodes' | 'planet'>[];
}
