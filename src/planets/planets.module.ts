import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { Planet } from './entities/planet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from 'src/characters/entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Planet])],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}
