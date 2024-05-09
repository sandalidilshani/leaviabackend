import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserleaveService } from './userleave.service';
import { CreateUserleaveDto } from './dto/create-userleave.dto';
import { UpdateUserleaveDto } from './dto/update-userleave.dto';
import { LeaveRequest } from 'src/leaverequest/entities/leaverequest.entity';
import { UserLeave } from './entities/userleave.entity';

@Controller('userleave')
export class UserleaveController {
  constructor(private readonly userleaveService: UserleaveService) {}

  @Post()
  async create(@Body() 
  createUserleaveDto: CreateUserleaveDto):Promise<UserLeave> {
    return this.userleaveService.create(createUserleaveDto);
  }

  @Get()
  findAll() {
    return this.userleaveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userleaveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserleaveDto: UpdateUserleaveDto) {
    return this.userleaveService.update(+id, updateUserleaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userleaveService.remove(+id);
  }
}
