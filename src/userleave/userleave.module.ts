import { Module } from '@nestjs/common';
import { UserleaveService } from './userleave.service';
import { UserleaveController } from './userleave.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plazeruser } from 'src/plazeruser/entities/plazeruser.entity';
import { UserLeave } from './entities/userleave.entity';

@Module({
  controllers: [UserleaveController],
  providers: [UserleaveService],
  imports:[TypeOrmModule.forFeature([UserLeave,Plazeruser])]
})
export class UserleaveModule {}
