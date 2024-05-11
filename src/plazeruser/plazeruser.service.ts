import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlazeruserDto } from './dto/create-plazeruser.dto';
import { UpdatePlazeruserDto } from './dto/update-plazeruser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plazeruser } from './entities/plazeruser.entity';
import { Repository, getRepository } from 'typeorm';
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

  
  //get all users
  findAll():Promise<Plazeruser[]> {
    return this.plazeuserRepositary.find();
  }

  //find user by username
  findOne(uname: string): Promise<Plazeruser> {
    return this.plazeuserRepositary.findOne({ where: { username: uname }});
  }
    
  
  

  remove(id: number) {
   // return await this.plazeuserRepositary.;
  }

  async findUserByUserName(username: string) {
    return await this.plazeuserRepositary.findOneBy({ username });
  }

  async getuserroleByUserName(username:string){
    const user = await this.plazeuserRepositary
    .createQueryBuilder("plazeruser")
    .select('plazeruser.role')
    .where('plazeruser.username = :username', { username: username })
    .getOne();
  
    if (user) {
      return user.role;
    } else {
      return null; // or handle the case where the user role is not found
    }
  }
  
}
