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
import { CharactersService } from './characters.service';
import {
  CreateCharacterRequestDto,
  CreateCharacterResponseDto,
} from './dto/create-character.dto';
import {
  UpdateCharacterRequestDto,
  UpdateCharacterResponseDto,
} from './dto/update-character.dto';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ReadCharactersResponseDto } from './dto/read-characters.dto';

@Controller('characters')
@UseInterceptors(ClassSerializerInterceptor)
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @ApiResponse({ type: CreateCharacterResponseDto, status: 201 })
  create(@Body() dto: CreateCharacterRequestDto) {
    return this.charactersService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, default: 1, required: false })
  @ApiQuery({ name: 'perPage', type: Number, default: 10, required: false })
  @ApiResponse({ type: ReadCharactersResponseDto, status: 200 })
  findAll(
    @Query('page', new ParseIntPipe({ optional: true }))
    page: number = 1,
    @Query('perPage', new ParseIntPipe({ optional: true }))
    perPage: number = 10,
  ) {
    return this.charactersService.findAll(page, perPage);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, format: 'uuid', required: true })
  @ApiResponse({ type: CreateCharacterResponseDto, status: 200 })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.charactersService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCharacterRequestDto, required: false })
  @ApiParam({ name: 'id', type: String, format: 'uuid', required: true })
  @ApiResponse({ type: UpdateCharacterResponseDto, status: 200 })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto?: UpdateCharacterRequestDto,
  ) {
    return this.charactersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', type: String, format: 'uuid', required: true })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.charactersService.remove(id);
  }
}
