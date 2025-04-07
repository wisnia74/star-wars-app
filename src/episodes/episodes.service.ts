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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createEpisodeDto: CreateEpisodeDto) {
    return 'This action adds a new episode';
  }

  findAll() {
    return `This action returns all episodes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} episode`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    return `This action updates a #${id} episode`;
  }

  remove(id: number) {
    return `This action removes a #${id} episode`;
  }
}
