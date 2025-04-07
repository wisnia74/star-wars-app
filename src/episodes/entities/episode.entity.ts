import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Character } from '../../characters/entities/character.entity';

export enum STAR_WARS_EPISODE {
  THE_PHANTOM_MENACE = 'The Phantom Menace',
  ATTACK_OF_THE_CLONES = 'Attack of the Clones',
  REVENGE_OF_THE_SITH = 'Revenge of the Sith',
  A_NEW_HOPE = 'A New Hope',
  THE_EMPIRE_STRIKES_BACK = 'The Empire Strikes Back',
  RETURN_OF_THE_JEDI = 'Return of the Jedi',
  THE_FORCE_AWAKENS = 'The Force Awakens',
  THE_LAST_JEDI = 'The Last Jedi',
  THE_RISE_OF_SKYWALKER = 'The Rise of Skywalker',
}

@Entity('episodes')
@Unique(['name'])
export class Episode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: STAR_WARS_EPISODE })
  name: STAR_WARS_EPISODE;

  @ManyToMany(() => Character, (character) => character.episodes)
  characters: Character[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
