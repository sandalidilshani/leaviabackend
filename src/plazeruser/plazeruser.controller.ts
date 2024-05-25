import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { PlazeruserService } from './plazeruser.service';
import { CreatePlazeruserDto } from './dto/create-plazeruser.dto';
import { UpdatePlazeruserDto } from './dto/update-plazeruser.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
//import { AuthGuard } from 'src/auth/guard/auth.guard';

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
  async getuserroles(@Param('username') username: string) {
    return this.plazeruserService.getuserroleByUserName(username);
  }

  @Get('userdetails')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('username') username: string, @Req() req) {
    console.log(req.user);
    return this.plazeruserService.findUserByUserName(req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    //return this.plazeruserService.remove();
  }

  @Get('leaves/:userid')
  async getUserLeaveRequest(@Param('userid', ParseIntPipe) userid: number) {
    return this.plazeruserService.getUserLeaveRequest(userid);
  }

  @Get('pendingleaves/:userid')
  async getPendingRequests(@Param('userid', ParseIntPipe) userid: number) {
    return this.plazeruserService.getPendingRequestsbyHR(userid);
  }


  //Hr Manager End points
  @Get('userdetails')
  @UseGuards(JwtAuthGuard)
  findUserOne(@Body('username') username: string, @Req() req) {
    console.log(req.user);
    return this.plazeruserService.findUserByUserName(req.user);
  }
}
