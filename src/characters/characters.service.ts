import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { Planet } from '@planets/entities/planet.entity';
import { Episode } from '@episodes/entities/episode.entity';

@Injectable()
export class CharactersService {
  async create(dto: CreateCharacterDto) {
    const character = Character.create(dto);

    if (dto.planetId) {
      character.planet = await Planet.findOne({
        where: { id: dto.planetId },
      });
    }

    if (dto.episodeIds && dto.episodeIds.length) {
      character.episodes = (
        await Promise.all(
          dto.episodeIds.map((id) => Episode.findOne({ where: { id } })),
        )
      ).filter((x) => x !== null);
    }

    return character.save();
  }

  findAll() {
    return Character.find({ relations: { episodes: true, planet: true } });
  }

  findOne(id: string) {
    return Character.findOne({
      where: { id },
      relations: { episodes: true, planet: true },
    });
  }

  async update(id: string, dto: UpdateCharacterDto) {
    const character = await Character.findOne({
      where: { id },
      relations: { episodes: true, planet: true },
    });

    if (dto.name) {
      character!.name = dto.name;
    }

    if (dto.planetId) {
      character!.planet = await Planet.findOne({
        where: { id: dto.planetId },
      });
    }

    if (dto.episodeIds && dto.episodeIds.length) {
      character!.episodes = (
        await Promise.all(
          dto.episodeIds.map((id) => Episode.findOne({ where: { id } })),
        )
      ).filter((x) => x !== null);
    }

    return character!.save();
  }

  remove(id: string) {
    return Character.delete(id);
  }
}
