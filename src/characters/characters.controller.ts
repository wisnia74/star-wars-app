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
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
@UseInterceptors(ClassSerializerInterceptor)
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() dto: CreateCharacterDto) {
    return this.charactersService.create(dto);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true }))
    page: number = 1,
    @Query('perPage', new ParseIntPipe({ optional: true }))
    perPage: number = 10,
  ) {
    return this.charactersService.findAll(page, perPage);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.charactersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateCharacterDto,
  ) {
    return this.charactersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.charactersService.remove(id);
  }
}
