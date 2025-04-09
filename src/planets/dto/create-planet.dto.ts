import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePlanetDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID(4, { each: true })
  characterIds?: string[];
}
