import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Episode } from './entities/episode.entity';
import { Character } from '@/characters/entities/character.entity';

@Injectable()
export class EpisodesService {
  async create(dto: CreateEpisodeDto) {
    const episode = Episode.create(dto);

    if (dto.characterIds && dto.characterIds.length) {
      episode.characters = (
        await Promise.all(
          dto.characterIds.map((id) => Character.findOne({ where: { id } })),
        )
      ).filter((x) => x !== null);
    }

    return episode.save();
  }

  findAll() {
    return Episode.find({ relations: { characters: true } });
  }

  findOne(id: string) {
    return Episode.findOne({ where: { id }, relations: { characters: true } });
  }

  async update(id: string, dto: UpdateEpisodeDto) {
    const episode = await Episode.findOne({
      where: { id },
      relations: { characters: true },
    });

    if (dto.name) {
      episode!.name = dto.name;
    }

    if (dto.characterIds && dto.characterIds.length) {
      episode!.characters = (
        await Promise.all(
          dto.characterIds.map((id) => Character.findOne({ where: { id } })),
        )
      ).filter((x) => x !== null);
    }

    return episode!.save();
  }

  remove(id: string) {
    return Episode.delete(id);
  }
}
