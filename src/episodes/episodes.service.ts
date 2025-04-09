import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpisodeRequestDto } from './dto/create-episode.dto';
import { UpdateEpisodeRequestDto } from './dto/update-episode.dto';
import { Episode } from './entities/episode.entity';
import { Character } from '@characters/entities/character.entity';
import { Pagination } from 'src/Pagination';

@Injectable()
export class EpisodesService {
  async create(dto: CreateEpisodeRequestDto) {
    const episode = Episode.create(dto);

    if (dto.characterIds && dto.characterIds.length) {
      episode.characters = await Promise.all(
        dto.characterIds.map((id) =>
          Character.findOneOrFail({ where: { id } }),
        ),
      );
    } else {
      episode.characters = [];
    }

    return episode.save();
  }

  async findAll(page: number = 1, perPage: number = 10) {
    const episodes = await Episode.find({ relations: { characters: true } });

    const pagination = new Pagination(page, perPage, episodes.length);

    return {
      pagination,
      data: episodes.slice((page - 1) * perPage, page * perPage),
    };
  }

  async findOne(id: string) {
    const episode = await Episode.findOne({
      where: { id },
      relations: { characters: true },
    });

    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} was not found`);
    }

    return episode;
  }

  async update(id: string, dto?: UpdateEpisodeRequestDto) {
    const episode = await Episode.findOne({
      where: { id },
      relations: { characters: true },
    });

    if (!dto) {
      return episode;
    }

    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} was not found`);
    }

    if (dto.name) {
      episode.name = dto.name;
    }

    if (dto.characterIds && dto.characterIds.length) {
      episode.characters = await Promise.all(
        dto.characterIds.map((id) =>
          Character.findOneOrFail({ where: { id } }),
        ),
      );
    } else if (dto.characterIds) {
      episode.characters = [];
    }

    return episode.save();
  }

  async remove(id: string) {
    if (!(await Episode.exists({ where: { id } }))) {
      throw new NotFoundException(`Episode with ID ${id} was not found`);
    }

    return Episode.delete(id);
  }
}
