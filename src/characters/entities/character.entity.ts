import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Episode } from '../../episodes/entities/episode.entity';
import { Planet } from '../../planets/entities/planet.entity';

@Entity('characters')
@Unique(['name'])
export class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The longest name in Star Wars is most likely `Paodok'Draba'Takat Sap'De'Rekti Nik'Linke'Ti' Ki'Vef'Nik'NeSevef'Li'Kek` (71 characters)
   *
   * @see https://www.starwars.com/news/25-weird-star-wars-character-names
   */
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToMany(() => Episode, (episode) => episode.characters, {
    cascade: true,
  })
  @JoinTable()
  episodes: Episode[];

  @ManyToOne(() => Planet, (planet) => planet.characters, { nullable: true })
  planet: Planet | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
