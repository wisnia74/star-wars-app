import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID(4)
  planetId?: string;

  @IsOptional()
  @IsUUID(4, { each: true })
  episodeIds?: string[];
}
