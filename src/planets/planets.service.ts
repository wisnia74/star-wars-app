import { Injectable } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { Character } from '@characters/entities/character.entity';
import { Pagination } from 'src/Pagination';

@Injectable()
export class PlanetsService {
  async create(dto: CreatePlanetDto) {
    const planet = Planet.create(dto);

    if (dto.characterIds && dto.characterIds.length) {
      planet.characters = (
        await Promise.all(
          dto.characterIds.map((id) => Character.findOne({ where: { id } })),
        )
      ).filter((x) => x !== null);
    }

    return planet.save();
  }

  async findAll(page: number = 1, perPage: number = 10) {
    const planets = await Planet.find({ relations: { characters: true } });

    const pagination = new Pagination(page, perPage, planets.length);

    return {
      pagination,
      data: planets.slice((page - 1) * perPage, page * perPage),
    };
  }

  findOne(id: string) {
    return Planet.findOne({
      where: { id },
      relations: { characters: true },
    });
  }

  async update(id: string, dto: UpdatePlanetDto) {
    const planet = await Planet.findOne({
      where: { id },
      relations: { characters: true },
    });

    if (dto.name) {
      planet!.name = dto.name;
    }

    if (dto.characterIds && dto.characterIds.length) {
      planet!.characters = (
        await Promise.all(
          dto.characterIds.map((id) => Character.findOne({ where: { id } })),
        )
      ).filter((x) => x !== null);
    }

    return planet!.save();
  }

  remove(id: string) {
    return Planet.delete(id);
  }
}
