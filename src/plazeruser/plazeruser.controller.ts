import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PlazeruserService } from './plazeruser.service';
import { CreatePlazeruserDto } from './dto/create-plazeruser.dto';
import { UpdatePlazeruserDto } from './dto/update-plazeruser.dto';

@Controller('plazeruser')
export class PlazeruserController {
  constructor(private readonly plazeruserService: PlazeruserService) {}

  @Post()
  create(@Body() createPlazeruserDto: CreatePlazeruserDto) {
    return this.plazeruserService.create(createPlazeruserDto);
  }

  @Get()
  findAll() {
    return this.plazeruserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id' ,ParseIntPipe)id: number) {
    return this.plazeruserService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updatePlazeruserDto: UpdatePlazeruserDto) {
    return this.plazeruserService.update(+id, updatePlazeruserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plazeruserService.remove(+id);
  }
}
