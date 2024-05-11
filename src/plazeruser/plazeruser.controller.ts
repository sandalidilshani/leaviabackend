import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PlazeruserService } from './plazeruser.service';
import { CreatePlazeruserDto } from './dto/create-plazeruser.dto';
import { UpdatePlazeruserDto } from './dto/update-plazeruser.dto';
import { Roles } from 'src/utility/common/roles.decorator';
import { Role } from 'src/utility/common/role.enum';
import { AuthGuard } from 'src/auth/guard/auth.guard';

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
  
  @Get('roles/:username')
  async getuserroles(@Param('username')username:string) {
    return this.plazeruserService.getuserroleByUserName(username);
  }

  @Get(':username')
  findOne(@Param('username' )username: string) {
    return this.plazeruserService.findUserByUserName(username);
  }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    //return this.plazeruserService.remove();
  }

  
}



