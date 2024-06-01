import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseEnumPipe,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { LeaverequestService } from './leaverequest.service';
import { CreateLeaverequestDto } from './dto/create-leaverequest.dto';
import { UpdateLeaverequestDto } from './dto/update-leaverequest.dto';
import { LeaveRequest } from './entities/leaverequest.entity';
import { leaveStatus } from 'src/utility/common/leaverequest..leavestatus.enum';
import { AuthGuard } from '@nestjs/passport';
import { UpdateLeaveRequestStatusDto } from './dto/update-leaveStatus.dto';

@Controller('leaverequest')
export class LeaverequestController {
  constructor(private readonly leaverequestService: LeaverequestService) { }

  //hr get all user's pending leaves
  @Get('/allpendingleaves')
  async getPendingRequest() {
    return this.leaverequestService.getPendingRequests();
  }
  //hr get relevent user details and leave details
  @Get('usersleavedetails/:leaveId')
  async getLeaveDetail(@Param('leaveId') leaveId: number) {
    return this.leaverequestService.getLeaveDetailsandUserDetails(leaveId);
  }

  @Post('/addleave')
  async create(@Body() leaverequestDto: CreateLeaverequestDto): Promise<any> {
    try {
      const leaverequest =
        await this.leaverequestService.create(leaverequestDto);
      return { success: true, data: leaverequest };
    } catch (error) {
      return { success: false, message: error.message }; // Return error message to the client
    }
  }

  @Get()
  async findAll(): Promise<LeaveRequest[]> {
    return this.leaverequestService.findAll();
  }

  @Get(':leaveId')
  async getLeaveDetailsById(
    @Param('leaveId') leaveId: number,
  ): Promise<LeaveRequest> {
    return this.leaverequestService.getLeaveDetailsById(leaveId);
  }

  //gets leaves by leave type for relevent user
  @Get('leavetype/:leaveTypeid')
  async getLeaveDetailsByleaveTypeid(
    @Param('leaveTypeid') leaveTypeid: number,
  ): Promise<LeaveRequest[]> {
    return this.leaverequestService.getLeaveDetailsByleaveTypeid(leaveTypeid);
  }

  //get pending leave requests
  @Get('status/:leavestatus')
  async getLeaveDetailsByleavestatus(
    @Param('leavestatus', new ParseEnumPipe(leaveStatus))
    leavestatus: leaveStatus,
  ): Promise<LeaveRequest[]> {
    return this.leaverequestService.getLeaveDetailsByleavestatus(leavestatus);
  }

  @Delete(':leaveId')
  async removeleaverequest(@Param('leaveId') leaveId: number): Promise<void> {
    return this.leaverequestService.removeleaverequest(leaveId);
  }

  @Get('pendingleave/:userid')
  async getPendingRequestsbyUser(
    @Param('userid', ParseIntPipe) userid: number,
  ) {
    return this.leaverequestService.getPendingRequestsbyUser(userid);
  }

  @Put('leave/:leaveId')
  async update(
    @Param('leaveId', ParseIntPipe) leveid: number,
    @Body() updateleaverequest: UpdateLeaverequestDto,
  ) {
    return this.leaverequestService.update(leveid, updateleaverequest);
  }

  @Put('updateleavestatus/:leaveId')
  async updateleaveStatus(
    @Param('leaveId', ParseIntPipe) leveId: number,
    @Body() updateleavestatusdto: UpdateLeaveRequestStatusDto,
  ) {
    return this.leaverequestService.updateleaveStatus(
      leveId,
      updateleavestatusdto,
    );
  }
}
