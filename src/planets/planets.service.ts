import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanetRequestDto } from './dto/create-planet.dto';
import { UpdatePlanetRequestDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { Character } from '@characters/entities/character.entity';
import { Pagination } from 'src/Pagination';

@Injectable()
export class PlanetsService {
  async create(dto: CreatePlanetRequestDto) {
    const planet = Planet.create(dto);

    if (dto.characterIds && dto.characterIds.length) {
      planet.characters = await Promise.all(
        dto.characterIds.map((id) =>
          Character.findOneOrFail({ where: { id } }),
        ),
      );
    } else {
      planet.characters = [];
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

  async findOne(id: string) {
    const planet = await Planet.findOne({
      where: { id },
      relations: { characters: true },
    });

    if (!planet) {
      throw new NotFoundException(`Planet with ID ${id} was not found`);
    }

    return planet;
  }

  async update(id: string, dto?: UpdatePlanetRequestDto) {
    const planet = await Planet.findOne({
      where: { id },
      relations: { characters: true },
    });

    if (!dto) {
      return planet;
    }

    if (!planet) {
      throw new NotFoundException(`Planet with ID ${id} was not found`);
    }

    if (dto.name) {
      planet.name = dto.name;
    }

    if (dto.characterIds && dto.characterIds.length) {
      planet.characters = await Promise.all(
        dto.characterIds.map((id) =>
          Character.findOneOrFail({ where: { id } }),
        ),
      );
    } else if (dto.characterIds) {
      planet.characters = [];
    }

    return planet.save();
  }

  async remove(id: string) {
    if (!(await Planet.exists({ where: { id } }))) {
      throw new NotFoundException(`Planet with ID ${id} was not found`);
    }

    await Planet.delete(id);
  }
}
