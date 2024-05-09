import { Injectable } from '@nestjs/common';
import { CreatePlazeruserDto } from './dto/create-plazeruser.dto';
import { UpdatePlazeruserDto } from './dto/update-plazeruser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plazeruser } from './entities/plazeruser.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';

@Injectable()
export class PlazeruserService {

  
  constructor(
    @InjectRepository(Plazeruser)
    private plazeuserRepositary:Repository<Plazeruser>,
  ){}
  
  
async create(PlazeruserDto: CreatePlazeruserDto):Promise<Plazeruser> {
const plazeuser=new Plazeruser();
return await this.plazeuserRepositary.save(plazeuser);
  }

 
  findAll() {
    return `This action returns all plazeruser`;
  }

  findOne(userid: number):Promise<Plazeruser> {
    return this.plazeuserRepositary.findOneBy({userid});
  }

  update(id: number, updatePlazeruserDto: UpdatePlazeruserDto) {
return this.plazeuserRepositary.update(id,updatePlazeruserDto)  }

  remove(id: number) {
    return `This action removes a #${id} plazeruser`;
  }
}
