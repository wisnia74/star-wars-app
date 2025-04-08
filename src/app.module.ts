import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { TypeOrmModule } from './typeorm.module';
import { CharactersModule } from './characters/characters.module';
import { EpisodesModule } from './episodes/episodes.module';
import { PlanetsModule } from './planets/planets.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    CharactersModule,
    EpisodesModule,
    PlanetsModule,
  ],
})
export class AppModule {}
