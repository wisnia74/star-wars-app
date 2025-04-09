import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePlanetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID(4, { each: true })
  characterIds?: string[];
}
