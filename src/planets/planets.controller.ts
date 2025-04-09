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
import { PlanetsService } from './planets.service';
import {
  CreatePlanetRequestDto,
  CreatePlanetResponseDto,
} from './dto/create-planet.dto';
import {
  UpdatePlanetRequestDto,
  UpdatePlanetResponseDto,
} from './dto/update-planet.dto';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ReadPlanetsResponseDto } from './dto/read-planets.dto';

@Controller('planets')
@UseInterceptors(ClassSerializerInterceptor)
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Post()
  @ApiResponse({ type: CreatePlanetResponseDto, status: 201 })
  create(@Body() dto: CreatePlanetRequestDto) {
    return this.planetsService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, default: 1, required: false })
  @ApiQuery({ name: 'perPage', type: Number, default: 10, required: false })
  @ApiResponse({ type: ReadPlanetsResponseDto, status: 200 })
  findAll(
    @Query('page', new ParseIntPipe({ optional: true }))
    page: number = 1,
    @Query('page', new ParseIntPipe({ optional: true }))
    perPage: number = 10,
  ) {
    return this.planetsService.findAll(page, perPage);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiResponse({ type: CreatePlanetResponseDto, status: 200 })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.planetsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiBody({ type: UpdatePlanetRequestDto, required: false })
  @ApiResponse({ type: UpdatePlanetResponseDto, status: 200 })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto?: UpdatePlanetRequestDto,
  ) {
    return this.planetsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.planetsService.remove(id);
  }
}
