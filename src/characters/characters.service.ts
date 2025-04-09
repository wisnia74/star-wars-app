import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { Planet } from '@planets/entities/planet.entity';
import { Episode } from '@episodes/entities/episode.entity';
import { Pagination } from 'src/Pagination';

@Injectable()
export class CharactersService {
  async create(dto: CreateCharacterDto) {
    const character = Character.create(dto);

    if (dto.planetId) {
      character.planet = await Planet.findOneOrFail({
        where: { id: dto.planetId },
      });
    }

    if (dto.episodeIds && dto.episodeIds.length) {
      character.episodes = await Promise.all(
        dto.episodeIds.map((id) => Episode.findOneOrFail({ where: { id } })),
      );
    } else {
      character.episodes = [];
    }

    return character.save();
  }

  async findAll(page: number = 1, perPage: number = 10) {
    const characters = await Character.find({
      relations: { episodes: true, planet: true },
    });

    const pagination = new Pagination(page, perPage, characters.length);

    return {
      pagination,
      data: characters.slice((page - 1) * perPage, page * perPage),
    };
  }

  async findOne(id: string) {
    const character = await Character.findOne({
      where: { id },
      relations: { episodes: true, planet: true },
    });

    if (!character) {
      throw new NotFoundException(`Character with ID ${id} was not found`);
    }

    return character;
  }

  async update(id: string, dto: UpdateCharacterDto) {
    const character = await Character.findOne({
      where: { id },
      relations: { episodes: true, planet: true },
    });

    if (!character) {
      throw new NotFoundException(`Character with ID ${id} was not found`);
    }

    if (dto.name) {
      character.name = dto.name;
    }

    if (dto.planetId) {
      character.planet = await Planet.findOneOrFail({
        where: { id: dto.planetId },
      });
    } else if (dto.planetId === null) {
      character.planet = null;
    }

    if (dto.episodeIds && dto.episodeIds.length) {
      character.episodes = await Promise.all(
        dto.episodeIds.map((id) => Episode.findOneOrFail({ where: { id } })),
      );
    } else if (dto.episodeIds) {
      character.episodes = [];
    }

    return character.save();
  }

  async remove(id: string) {
    const character = await Character.findOne({ where: { id } });

    if (!character) {
      throw new NotFoundException(`Character with ID ${id} was not found`);
    }

    return character.remove();
  }
}
