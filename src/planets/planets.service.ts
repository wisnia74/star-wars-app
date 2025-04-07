import { Injectable } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,
  ) {}

  create(dto: CreatePlanetDto) {
    const planet = this.planetsRepository.create(dto);

    return this.planetsRepository.save(planet);
  }

  findAll() {
    return this.planetsRepository.find();
  }

  findOne(id: string) {
    return this.planetsRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdatePlanetDto) {
    const planet = await this.planetsRepository.findOne({ where: { id } });

    return this.planetsRepository.save({ ...planet, ...dto });
  }

  remove(id: string) {
    return this.planetsRepository.delete(id);
  }
}
