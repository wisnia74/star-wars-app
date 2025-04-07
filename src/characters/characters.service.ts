import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
  ) {}

  create(dto: CreateCharacterDto) {
    const character = this.charactersRepository.create(dto);

    return this.charactersRepository.save(character);
  }

  findAll() {
    return this.charactersRepository.find();
  }

  findOne(id: string) {
    return this.charactersRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateCharacterDto) {
    const character = await this.charactersRepository.findOne({
      where: { id },
    });

    return this.charactersRepository.save({ ...character, ...dto });
  }

  remove(id: string) {
    return this.charactersRepository.delete(id);
  }
}
