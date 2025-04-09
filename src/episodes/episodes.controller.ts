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
  HttpCode,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import {
  CreateEpisodeRequestDto,
  CreateEpisodeResponseDto,
} from './dto/create-episode.dto';
import {
  UpdateEpisodeRequestDto,
  UpdateEpisodeResponseDto,
} from './dto/update-episode.dto';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ReadEpisodesResponseDto } from './dto/read-episodes.dto';

@Controller('episodes')
@UseInterceptors(ClassSerializerInterceptor)
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  @ApiResponse({ type: CreateEpisodeResponseDto, status: 201 })
  create(@Body() dto: CreateEpisodeRequestDto) {
    return this.episodesService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, default: 1, required: false })
  @ApiQuery({ name: 'perPage', type: Number, default: 10, required: false })
  @ApiResponse({ type: ReadEpisodesResponseDto, status: 200 })
  findAll(
    @Query('page', new ParseIntPipe({ optional: true }))
    page: number = 1,
    @Query('page', new ParseIntPipe({ optional: true }))
    perPage: number = 10,
  ) {
    return this.episodesService.findAll(page, perPage);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiResponse({ type: CreateEpisodeResponseDto, status: 200 })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.episodesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiBody({ type: UpdateEpisodeRequestDto, required: false })
  @ApiResponse({ type: UpdateEpisodeResponseDto, status: 200 })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto?: UpdateEpisodeRequestDto,
  ) {
    return this.episodesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.episodesService.remove(id);
  }
}
