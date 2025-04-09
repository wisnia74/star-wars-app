import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';
import { CreateCharacterResponseDto } from './create-character.dto';

export class UpdateCharacterRequestDto {
  @ApiProperty({ type: String, minLength: 1, required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({ type: String, format: 'uuid', required: false })
  @IsOptional()
  @IsUUID(4)
  planetId?: string;

  @ApiProperty({ type: [String], format: 'uuid', required: false })
  @IsOptional()
  @IsUUID(4, { each: true })
  episodeIds?: string[];
}

export class UpdateCharacterResponseDto extends CreateCharacterResponseDto {}
