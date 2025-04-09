import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Controller('episodes')
@UseInterceptors(ClassSerializerInterceptor)
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  create(@Body() dto: CreateEpisodeDto) {
    return this.episodesService.create(dto);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true }))
    page: number = 1,
    @Query('page', new ParseIntPipe({ optional: true }))
    perPage: number = 10,
  ) {
    return this.episodesService.findAll(page, perPage);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.episodesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateEpisodeDto,
  ) {
    return this.episodesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.episodesService.remove(id);
  }
}
