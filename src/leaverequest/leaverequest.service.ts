import { Injectable } from '@nestjs/common';
import { CreateLeaverequestDto } from './dto/create-leaverequest.dto';
import { UpdateLeaverequestDto } from './dto/update-leaverequest.dto';
import { LeaveRequest } from './entities/leaverequest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Like, Repository } from 'typeorm';
import { Leavetype } from 'src/leavetype/entities/leavetype.entity';
import { Plazeruser } from 'src/plazeruser/entities/plazeruser.entity';
import { leaveStatus } from 'src/utility/common/leaverequest..leavestatus.enum';
import { error } from 'console';
@Injectable()
export class LeaverequestService {
  update(arg0: number, updateLeaverequestDto: UpdateLeaverequestDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(LeaveRequest)
    private leaverequestRepository: Repository<LeaveRequest>,

    @InjectRepository(Leavetype)
    private leavetypeRepo: Repository<Leavetype>,

    @InjectRepository(Plazeruser)
    private plazeruserRepo: Repository<Plazeruser>,
  ) {}

  async create(
    createLeaverequestDto: CreateLeaverequestDto,
  ): Promise<LeaveRequest> {
    const leaverequest = new LeaveRequest();
    leaverequest.leaveStart = new Date(createLeaverequestDto.leaveStart);
    leaverequest.leaveEnd = new Date(createLeaverequestDto.leaveEnd);
    leaverequest.leaveReason = createLeaverequestDto.leaveReason;
    leaverequest.requestDate = createLeaverequestDto.requestDate;
    const leavetype = await this.leavetypeRepo.findOneById(
      +createLeaverequestDto.leaveType,
    );
    leaverequest.leaveType = leavetype;

    const plazeruser = await this.plazeruserRepo.findOneById(
      createLeaverequestDto.plazeruserid,
    );
    leaverequest.plazeruserid = plazeruser;

    try{ 
      return await this.leaverequestRepository.save(leaverequest);

    }catch(err){
      console.log(error)
    }
  }

  async findAll(): Promise<LeaveRequest[]> {
    return this.leaverequestRepository.find();
  }

  //get request details by Leaveid
  async getLeaveDetailsById(leaveId: number) {
    return await this.leaverequestRepository.findOne({
      where: { leaveId },
    });
  }

  //get leavea requests by leave type
  async getLeaveDetailsByleaveTypeid(
    leaveType: number,
  ): Promise<LeaveRequest[]> {
    return await this.leaverequestRepository.find({
      where: {
        leaveType: {
          leaveTypeid: leaveType,
        },
      },
      relations: {
        leaveType: true,
      },
    });
  }

  // request leaves by leave status
  async getLeaveDetailsByleavestatus(
    leavestatus: leaveStatus,
  ): Promise<LeaveRequest[]> {
    return await this.leaverequestRepository.find({
      where: { leavestatus: In[leavestatus] },
      relations:['leaveType']
       
      
    });
  }

  //remove leave request
  async removeleaverequest(leaveId: number): Promise<void> {
    await this.leaverequestRepository.delete(leaveId);
  }
}
