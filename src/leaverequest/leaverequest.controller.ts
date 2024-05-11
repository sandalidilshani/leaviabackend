import { Controller, Get, Post, Body, Patch, Param, Delete, ParseEnumPipe, UseGuards } from '@nestjs/common';
import { LeaverequestService } from './leaverequest.service';
import { CreateLeaverequestDto } from './dto/create-leaverequest.dto';
import { UpdateLeaverequestDto } from './dto/update-leaverequest.dto';
import{LeaveRequest} from './entities/leaverequest.entity'
import {  leaveStatus } from 'src/utility/common/leaverequest..leavestatus.enum';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('leaverequest')
export class LeaverequestController {
  constructor(private readonly leaverequestService: LeaverequestService) {}

  @Post('/addleave')
  async create(@Body() leaverequestDto: CreateLeaverequestDto): Promise<any> {
    try {
      const leaverequest = await this.leaverequestService.create(leaverequestDto);
      return { success: true, data: leaverequest };
    } catch (error) {
      return { success: false, message: error.message }; // Return error message to the client
    }
  }
  

  @Get()
  async findAll():Promise<LeaveRequest[]> {
    return this.leaverequestService.findAll();
  }

  @Get(':leaveId')
  async getLeaveDetailsById(@Param('leaveId') leaveId: number) :Promise<LeaveRequest>{
    return this.leaverequestService.getLeaveDetailsById(leaveId);
  }

   
  @Get('leavetype/:leaveTypeid')
 async getLeaveDetailsByleaveTypeid(@Param('leaveTypeid')leaveTypeid:number):Promise<LeaveRequest[]>{

  return this.leaverequestService.getLeaveDetailsByleaveTypeid(leaveTypeid)
 }
  

 //get pending leave requests 
 @Get ('status/:leavestatus')
 async getLeaveDetailsByleavestatus(@Param('leavestatus',new ParseEnumPipe(leaveStatus))leavestatus:leaveStatus):Promise<LeaveRequest[]>{
 return this.leaverequestService.getLeaveDetailsByleavestatus(leavestatus)
 }



  @Delete(':leaveId')
  async removeleaverequest(@Param('leaveId') leaveId: number):Promise<void> {
    return this.leaverequestService.removeleaverequest(leaveId);
  }
}
