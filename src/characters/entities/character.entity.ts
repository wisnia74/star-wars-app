import {
  BaseEntity,
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
import { Episode } from '@episodes/entities/episode.entity';
import { Planet } from '@planets/entities/planet.entity';
import { Exclude, Transform } from 'class-transformer';

@Entity('characters')
@Unique(['name'])
export class Character extends BaseEntity {
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
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @Transform(
    ({ value }: { value: Episode[] }) =>
      value.map(({ id, name }) => ({ id, name })),
    {
      toPlainOnly: true,
    },
  )
  episodes: Episode[];

  @ManyToOne(() => Planet, (planet) => planet.characters, {
    onDelete: 'SET NULL',
  })
  @Transform(
    ({ value }: { value: Planet | null }) =>
      (value && { id: value.id, name: value.name }) ?? undefined,
    { toPlainOnly: true },
  )
  planet: Planet | null;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
