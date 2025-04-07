import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './entities/episode.entity';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private episodesRepository: Repository<Episode>,
  ) {}

  create(dto: CreateEpisodeDto) {
    const episode = this.episodesRepository.create(dto);

    return this.episodesRepository.save(episode);
  }

  findAll() {
    return this.episodesRepository.find();
  }

  findOne(id: string) {
    return this.episodesRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateEpisodeDto) {
    const episode = await this.episodesRepository.findOne({ where: { id } });

    return this.episodesRepository.save({ episode, ...dto });
  }

  remove(id: string) {
    return this.episodesRepository.delete(id);
  }
}
