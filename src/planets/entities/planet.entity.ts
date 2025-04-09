import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Character } from '@characters/entities/character.entity';
import { Exclude, Transform } from 'class-transformer';

@Entity('planets')
@Unique(['name'])
export class Planet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 25 })
  name: string;

  @OneToMany(() => Character, (character) => character.planet, {
    onDelete: 'CASCADE',
  })
  @Transform(
    ({ value }: { value: Character[] }) =>
      value.map(({ id, name }) => ({ id, name })),
    {
      toPlainOnly: true,
    },
  )
  characters: Character[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
