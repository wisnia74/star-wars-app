import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';
import { CreatePlanetResponseDto } from './create-planet.dto';

export class UpdatePlanetRequestDto {
  @ApiProperty({ type: String, minLength: 1, required: false })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({ type: [String], format: 'uuid', required: false })
  @IsOptional()
  @IsUUID(4, { each: true })
  characterIds?: string[];
}

export class UpdatePlanetResponseDto extends CreatePlanetResponseDto {}
