import { Injectable } from '@nestjs/common';
import { CreateLeaverequestDto } from './dto/create-leaverequest.dto';
import { UpdateLeaverequestDto } from './dto/update-leaverequest.dto';
import { LeaveRequest } from './entities/leaverequest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Like, Repository, UpdateResult } from 'typeorm';
import { Leavetype } from 'src/leavetype/entities/leavetype.entity';
import { Plazeruser } from 'src/plazeruser/entities/plazeruser.entity';
import { leaveStatus } from 'src/utility/common/leaverequest..leavestatus.enum';
import { error } from 'console';
import { UpdateLeaveRequestStatusDto } from './dto/update-leaveStatus.dto';
@Injectable()
export class LeaverequestService {
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

    try {
      return await this.leaverequestRepository.save(leaverequest);
    } catch (err) {
      console.log(error);
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
      relations: ['leaveType'],
    });
  }

  // request leaves by leave status
  async getLeaveDetailsByleavestatus(
    leavestatus: leaveStatus,
  ): Promise<LeaveRequest[]> {
    return await this.leaverequestRepository.find({
      where: { leavestatus: In[leavestatus] },
    });
  }

  //remove leave request
  async removeleaverequest(leaveId: number): Promise<void> {
    await this.leaverequestRepository.delete(leaveId);
  }

  //get user pending leaves by user id
  async getPendingRequestsbyUser(userid: number) {
    try {
      const pendingRequests = await this.leaverequestRepository
        .createQueryBuilder('leaverequest')
        .leftJoinAndSelect('leaverequest.plazeruserid', 'Plazeruser')
        .where('Plazeruser.userid = :userid', { userid })
        .andWhere('leaverequest.leavestatus = :status', { status: '{pending}' })
        .select([
          'leaverequest.leaveId',
          'leaverequest.leaveStart',
          'leaverequest.leaveEnd',
          'leaverequest.leaveReason',
          'leaverequest.requestDate',
          'leaverequest.leaveType',
        ])
        .getMany();

      if (pendingRequests.length === 0) {
        return 'No Pending request';
      }
      return pendingRequests;
    } catch (error) {
      console.error('Error in getPendingRequests:', error);
      return null;
    }
  }

  //update pending Request
  async update(
    leaveId: number,
    updateleaverequestdto: UpdateLeaverequestDto,
  ): Promise<UpdateResult> {
    try {
      const updateData: Partial<LeaveRequest> = {
        leaveStart: new Date(updateleaverequestdto.leaveStart),
        leaveEnd: new Date(updateleaverequestdto.leaveEnd),
        leaveReason: updateleaverequestdto.leaveReason,
        requestDate: new Date(updateleaverequestdto.requestDate),
      };
      return this.leaverequestRepository.update(leaveId, updateData);
    } catch (error) {
      console.error('Error in getPendingRequests:', error);
      return null;
    }
  }

  //update levae request status by HR
  async updateleaveStatus(
    leaveId: number,
    updateleaverequeststatus: UpdateLeaveRequestStatusDto,
  ): Promise<UpdateResult> {
    try {
      const updateData: Partial<LeaveRequest> = {
        leavestatus: [updateleaverequeststatus.newStatus],
      };
      const result = await this.leaverequestRepository.update(
        leaveId,
        updateData,
      );
      if (result.affected === 0) {
        throw new Error('Update failed: leave ID not found');
      }
      return result;
    } catch (error) {
      console.error('Error in getPendingRequests:', error);
      return null;
    }
  }
}
