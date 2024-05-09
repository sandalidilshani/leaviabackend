import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeavetypeService } from './leavetype.service';
import { CreateLeavetypeDto } from './dto/create-leavetype.dto';
import { UpdateLeavetypeDto } from './dto/update-leavetype.dto';
import { Leavetype } from './entities/leavetype.entity';

@Controller('leavetype')
export class LeavetypeController {
  constructor(private readonly leavetypeService: LeavetypeService) {}

  @Post('/addtype')
  create(@Body() 
  createLeavetypeDto: CreateLeavetypeDto):Promise<Leavetype> {
    return this.leavetypeService.create(createLeavetypeDto);
  }

  @Get('/alltypes')
  findAll() {
    return this.leavetypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leavetypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeavetypeDto: UpdateLeavetypeDto) {
    return this.leavetypeService.update(+id, updateLeavetypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leavetypeService.remove(+id);
  }
}
