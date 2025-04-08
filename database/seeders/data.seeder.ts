import { Character } from '@characters/entities/character.entity';
import { Episode, STAR_WARS_EPISODE } from '@episodes/entities/episode.entity';
import { Planet } from '@planets/entities/planet.entity';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';

const CHARACTERS = [
  'Luke Skywalker',
  'Leia Organa',
  'Han Solo',
  'Darth Vader',
  'Yoda',
];

const PLANETS = ['Tatooine', 'Alderaan', 'Hoth', 'Dagobah', 'Bespin'];

const EPISODES = [
  STAR_WARS_EPISODE.THE_PHANTOM_MENACE,
  STAR_WARS_EPISODE.ATTACK_OF_THE_CLONES,
  STAR_WARS_EPISODE.REVENGE_OF_THE_SITH,
  STAR_WARS_EPISODE.A_NEW_HOPE,
  STAR_WARS_EPISODE.THE_EMPIRE_STRIKES_BACK,
];

export default class DataSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const planets: Record<string, Planet> = PLANETS.reduce((acc, next) => {
      acc[next] = Planet.create({
        name: next,
      });

      return acc;
    }, {});

    const characters: Record<string, Character> = CHARACTERS.reduce(
      (acc, next) => {
        acc[next] = Character.create({
          name: next,
        });

        return acc;
      },
      {},
    );

    const episodes: Record<string, Episode> = EPISODES.reduce((acc, next) => {
      acc[next] = Episode.create({
        name: next,
      });

      return acc;
    }, {});

    characters['Luke Skywalker'].planet = planets['Tatooine'];
    characters['Leia Organa'].planet = planets['Tatooine'];
    characters['Han Solo'].planet = planets['Alderaan'];
    characters['Darth Vader'].planet = planets['Hoth'];

    characters['Luke Skywalker'].episodes = [
      episodes[STAR_WARS_EPISODE.THE_PHANTOM_MENACE],
      episodes[STAR_WARS_EPISODE.ATTACK_OF_THE_CLONES],
    ];
    characters['Leia Organa'].episodes = [
      episodes[STAR_WARS_EPISODE.THE_PHANTOM_MENACE],
      episodes[STAR_WARS_EPISODE.REVENGE_OF_THE_SITH],
    ];
    characters['Han Solo'].episodes = [
      episodes[STAR_WARS_EPISODE.REVENGE_OF_THE_SITH],
      episodes[STAR_WARS_EPISODE.A_NEW_HOPE],
    ];
    characters['Yoda'].episodes = [
      episodes[STAR_WARS_EPISODE.THE_EMPIRE_STRIKES_BACK],
    ];

    await dataSource.createEntityManager().save<Planet>(Object.values(planets));
    await dataSource
      .createEntityManager()
      .save<Episode>(Object.values(episodes));
    await dataSource
      .createEntityManager()
      .save<Character>(Object.values(characters));
  }
}
