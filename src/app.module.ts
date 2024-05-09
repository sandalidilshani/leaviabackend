import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { PlazeruserModule } from './plazeruser/plazeruser.module';
import { LeaverequestModule } from './leaverequest/leaverequest.module';
import { LeavetypeModule } from './leavetype/leavetype.module';
import { UserleaveModule } from './userleave/userleave.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), PlazeruserModule, LeaverequestModule, LeavetypeModule,  UserleaveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
