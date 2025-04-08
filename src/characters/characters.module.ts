import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from '@planets/entities/planet.entity';
import { Episode } from '@episodes/entities/episode.entity';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Character } from './entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Episode, Planet])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
