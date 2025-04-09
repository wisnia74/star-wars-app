import { CreateEpisodeResponseDto } from '@episodes/dto/create-episode.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreatePlanetResponseDto } from '@planets/dto/create-planet.dto';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCharacterRequestDto {
  @ApiProperty({ type: String, minLength: 1 })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, format: 'uuid', required: false })
  @IsOptional()
  @IsUUID(4)
  planetId?: string;

  @ApiProperty({ type: [String], format: 'uuid', required: false })
  @IsOptional()
  @IsUUID(4, { each: true })
  episodeIds?: string[];
}

export class CreateCharacterResponseDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty({ type: String, minLength: 1 })
  name: string;

  @ApiProperty({
    type: () => [OmitType(CreatePlanetResponseDto, ['characters'])],
    required: false,
  })
  planet?: Omit<CreatePlanetResponseDto, 'characters'>;

  @ApiProperty({
    type: () => [OmitType(CreateEpisodeResponseDto, ['characters'])],
  })
  episodes: Omit<CreateEpisodeResponseDto, 'characters'>[];
}
