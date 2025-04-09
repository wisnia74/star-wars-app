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
  'Obi-Wan Kenobi',
  'Chewbacca',
  'R2-D2',
  'C-3PO',
  'Padmé Amidala',
  'Anakin Skywalker',
  'Boba Fett',
  'Jango Fett',
  'Darth Maul',
  'Emperor Palpatine',
  'Lando Calrissian',
  'Wicket W. Warrick',
  'Jar Jar Binks',
  'Dooku',
  'Mace Windu',
];

const PLANETS = [
  'Tatooine',
  'Alderaan',
  'Hoth',
  'Dagobah',
  'Bespin',
  'Endor',
  'Naboo',
  'Kamino',
  'Geonosis',
  'Mustafar',
];

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
    characters['Darth Vader'].planet = planets['Alderaan'];
    characters['Yoda'].planet = planets['Hoth'];
    characters['Obi-Wan Kenobi'].planet = planets['Hoth'];
    characters['Chewbacca'].planet = planets['Dagobah'];
    characters['R2-D2'].planet = planets['Dagobah'];
    characters['C-3PO'].planet = planets['Bespin'];
    characters['Padmé Amidala'].planet = planets['Endor'];
    characters['Anakin Skywalker'].planet = planets['Naboo'];

    characters['Luke Skywalker'].episodes = [
      episodes[STAR_WARS_EPISODE.THE_PHANTOM_MENACE],
      episodes[STAR_WARS_EPISODE.ATTACK_OF_THE_CLONES],
    ];
    characters['Leia Organa'].episodes = [
      episodes[STAR_WARS_EPISODE.THE_PHANTOM_MENACE],
      episodes[STAR_WARS_EPISODE.ATTACK_OF_THE_CLONES],
    ];
    characters['Han Solo'].episodes = [
      episodes[STAR_WARS_EPISODE.REVENGE_OF_THE_SITH],
      episodes[STAR_WARS_EPISODE.A_NEW_HOPE],
    ];
    characters['Yoda'].episodes = [
      episodes[STAR_WARS_EPISODE.REVENGE_OF_THE_SITH],
      episodes[STAR_WARS_EPISODE.A_NEW_HOPE],
    ];
    characters['Obi-Wan Kenobi'].episodes = [
      episodes[STAR_WARS_EPISODE.A_NEW_HOPE],
    ];
    characters['Chewbacca'].episodes = [episodes[STAR_WARS_EPISODE.A_NEW_HOPE]];

    await dataSource.createEntityManager().save<Planet>(Object.values(planets));
    await dataSource
      .createEntityManager()
      .save<Episode>(Object.values(episodes));
    await dataSource
      .createEntityManager()
      .save<Character>(Object.values(characters));
  }
}
