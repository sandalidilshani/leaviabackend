
import { LeaveRequest } from "src/leaverequest/entities/leaverequest.entity";
import { UserLeave } from "src/userleave/entities/userleave.entity";
import {
    Column,
    Entity,
    Index,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    JoinTable,
    OneToOne,
    
    
  } from "typeorm";
  
  @Entity()
  export class Plazeruser {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    userid: number;
  
    @Column()
    username: string ;
  
    @Column()
    upassword: string;
  
    @Column()
    ufname: string ;
  
    @Column()
    ulname: string;
  
    @Column()
    addressl1: string;
  
    @Column()
    addressl2: string;
  
    @Column()
    addressl3: string ;
  
    @Column()
    email: string ;
  
    @Column()
    skills: string ;
  
    @Column("timestamp")
    dob: Date ;
  
    @Column()
    gitrepo: string ;
  
    @Column()
    role: string;
  
  
    @OneToMany(()=>LeaveRequest,(leaverequest)=>leaverequest.plazeruserid)
    leaverequests:LeaveRequest[];
   
    @OneToOne(()=>UserLeave,(userleave)=>userleave.plazeruserid)
    userleave:UserLeave;
  
  }
  
  
  

  