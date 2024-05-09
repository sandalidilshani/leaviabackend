import { Injectable } from '@nestjs/common';
import { CreateUserleaveDto } from './dto/create-userleave.dto';
import { UpdateUserleaveDto } from './dto/update-userleave.dto';
import { UserLeave } from './entities/userleave.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plazeruser } from 'src/plazeruser/entities/plazeruser.entity';

@Injectable()
export class UserleaveService {

  constructor(
    @InjectRepository(UserLeave)
    private userLeaverepo:Repository<UserLeave>,

    @InjectRepository(Plazeruser)
    private plazerUserRepo:Repository<Plazeruser>,
  ){}


  async create(createUserleaveDto: CreateUserleaveDto):Promise<UserLeave> {
    const userleave=new UserLeave();
    userleave.totalLeaves=createUserleaveDto.tottotalLeaves;
    userleave.availableLeaves=createUserleaveDto.availableleaves;
    

    const user= await this.plazerUserRepo.findOneById(createUserleaveDto.plazeruserid)
    if (!user) {
      // handle if user not found
      throw new Error('User not found');
    }
    userleave.plazeruserid=user;

    return await this.userLeaverepo.save(userleave)
  }

  findAll() {
    return `This action returns all userleave`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userleave`;
  }

  update(id: number, updateUserleaveDto: UpdateUserleaveDto) {
    return `This action updates a #${id} userleave`;
  }

  remove(id: number) {
    return `This action removes a #${id} userleave`;
  }
}
