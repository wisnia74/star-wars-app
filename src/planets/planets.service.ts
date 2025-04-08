import { Injectable } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { Character } from '@/characters/entities/character.entity';

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

  findAll() {
    return Planet.find({ relations: { characters: true } });
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
