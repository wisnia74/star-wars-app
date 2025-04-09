import { CreateCharacterResponseDto } from '@characters/dto/create-character.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePlanetRequestDto {
  @ApiProperty({ type: String, minLength: 1 })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: [String], format: 'uuid', required: false })
  @IsOptional()
  @IsUUID(4, { each: true })
  characterIds?: string[];
}

export class CreatePlanetResponseDto {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty({ type: String, minLength: 1 })
  name: string;

  @ApiProperty({
    type: () => [OmitType(CreateCharacterResponseDto, ['episodes', 'planet'])],
  })
  characters: Omit<CreateCharacterResponseDto, 'episodes' | 'planet'>[];
}
