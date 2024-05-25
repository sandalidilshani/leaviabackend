import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlazeruserDto } from './dto/create-plazeruser.dto';
import { UpdatePlazeruserDto } from './dto/update-plazeruser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plazeruser } from './entities/plazeruser.entity';
import { Repository, createQueryBuilder, getRepository } from 'typeorm';
import { LeaveRequest } from 'src/leaverequest/entities/leaverequest.entity';
import { leaveStatus } from 'src/utility/common/leaverequest..leavestatus.enum';
import { request } from 'http';
import { error } from 'console';
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
  findAll(): Promise<Plazeruser[]> {
    return this.plazeuserRepositary.find();
  }

  //find user by username
  findOne(uname: string): Promise<Plazeruser> {
    return this.plazeuserRepositary.findOne({ where: { username: uname } });
  }

  remove(id: number) {
    // return await this.plazeuserRepositary.;
  }

  async findUserByUserName(username: string) {
    return await this.plazeuserRepositary.findOneBy({ username });
  }

  async getuserroleByUserName(username: string) {
    const user = await this.plazeuserRepositary
      .createQueryBuilder('plazeruser')
      .select('plazeruser.role')
      .where('plazeruser.username = :username', { username: username })
      .getOne();

    if (user) {
      return user.role;
    } else {
      return null;
    }
  }

  //get relevent user leaves by userid.
  async getUserLeaveRequest(userid: number) {
    const plazeruser = await this.plazeuserRepositary.findOne({
      where: { userid },
      relations: ['leaverequests'],
    });
  }


  //get relevent user pending leaves by userid with user details .
  async getPendingRequestsbyHR(userid: number) {
    try {
      const user = await this.plazeuserRepositary
        .createQueryBuilder('plazeruser')
        .select([
          'plazeruser.userid',
          'plazeruser.username',
          'plazeruser.username',
          'plazeruser.ufname',
          'plazeruser.ulname',
          'leaverequest',
        ])
        .leftJoin(
          'plazeruser.leaverequests',
          'leaverequest',
          'leaverequest.leavestatus=:leavestatus',
          {
            leavestatus: '{pending}',
          },
        )

        .where('plazeruser.userid = :userid', { userid: userid })
        .getOne();

      return user;
    } catch (error) {
      console.error('Error in getPendingRequests:', error);
      return null;
    }
  }

  
}
