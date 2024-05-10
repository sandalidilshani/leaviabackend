import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlazeruserDto } from './dto/create-plazeruser.dto';
import { UpdatePlazeruserDto } from './dto/update-plazeruser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plazeruser } from './entities/plazeruser.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';
import { userSignInDto } from './dto/user-signin.dto';
import { compare } from 'bcrypt';
import dataSource from 'db/data-source';
@Injectable()
export class PlazeruserService {
  constructor(
    @InjectRepository(Plazeruser)
    private plazeuserRepositary: Repository<Plazeruser>,
  ) {}

  async create(PlazeruserDto: CreatePlazeruserDto): Promise<Plazeruser> {
    const plazeuser = new Plazeruser();
    return await this.plazeuserRepositary.save(plazeuser);
  }

  
  findAll() {
    return `This action returns all plazeruser`;
  }

  findOne(uname: string): Promise<Plazeruser> {
    return this.plazeuserRepositary.findOne({ where: { username: uname }});
  }
    
  async fetchUserRole(userid: number): Promise<string> {
      const userRole = await this.plazeuserRepositary
        .createQueryBuilder("Plazeruser")
        .select('Plazeruser.role')
        .where('Plazeruser.userid = :userid', { userid: userid })
        .getOne();
      
        if (userRole) {
          return userRole.role;
        } else {
          return null; // or handle the case where the user role is not found
        }
    }
    
  update(id: number, updatePlazeruserDto: UpdatePlazeruserDto) {
    return this.plazeuserRepositary.update(id, updatePlazeruserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} plazeruser`;
  }

  async findUserByUserName(username: string) {
    return await this.plazeuserRepositary.findOneBy({ username });
  }

  
  
}
