import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PlazeruserService } from './plazeruser.service';
import { CreatePlazeruserDto } from './dto/create-plazeruser.dto';
import { UpdatePlazeruserDto } from './dto/update-plazeruser.dto';
import { userSignInDto } from './dto/user-signin.dto';
import { Roles } from 'src/utility/common/roles.decorator';
import { Role } from 'src/utility/common/role.enum';

@Controller('plazeruser')
export class PlazeruserController {
  constructor(private readonly plazeruserService: PlazeruserService) {}

  @Post()
  create(@Body() createPlazeruserDto: CreatePlazeruserDto) {
    return this.plazeruserService.create(createPlazeruserDto);
  }

  
  @Get()
@Roles(Role.Manager)
  findAll() {
    return this.plazeruserService.findAll();
  }
  
  @Get('roles/:userid')
  async getuserroles(@Param('userid')userid:number) {
    return this.plazeruserService.fetchUserRole(userid);
  }


  @Get(':username')
  findOne(@Param('username' )username: string) {
    return this.plazeruserService.findOne(username);
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



