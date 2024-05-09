import { Module } from '@nestjs/common';
import { LeaverequestService } from './leaverequest.service';
import { LeaverequestController } from './leaverequest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequest } from './entities/leaverequest.entity';
import { Leavetype } from 'src/leavetype/entities/leavetype.entity';
import { Plazeruser } from 'src/plazeruser/entities/plazeruser.entity';

@Module({
  controllers: [LeaverequestController],
  providers: [LeaverequestService],
  imports:[TypeOrmModule.forFeature([LeaveRequest,Leavetype,Plazeruser])]
})
export class LeaverequestModule {}
