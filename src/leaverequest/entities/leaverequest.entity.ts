import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import {  Leavetype } from "src/leavetype/entities/leavetype.entity";
import { Plazeruser } from "src/plazeruser/entities/plazeruser.entity";
import { leaveStatus } from "src/utility/common/leaverequest..leavestatus.enum";
@Entity()
export class LeaveRequest {
  @PrimaryGeneratedColumn()
  leaveId: number;

  @Column("date")
  leaveStart: Date;

  @Column("date")
  leaveEnd: Date;

  @Column()
  leaveReason: string;

  @Column({type:'enum',enum:leaveStatus,array:true,default:[leaveStatus.PENDING]})
  leavestatus: leaveStatus[];

  @Column("date")
  requestDate: Date; 

  @Column("date",{nullable:true})
  approveDate: Date;

  @ManyToOne(()=>Plazeruser,(plazeruserid)=>plazeruserid.leaverequests)
  plazeruserid:Plazeruser;

  @ManyToOne(() => Leavetype, (leavetype) => leavetype.leaverequests,{eager: true})
  leaveType: Leavetype;

}