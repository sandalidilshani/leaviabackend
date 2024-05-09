import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Plazeruser } from "src/plazeruser/entities/plazeruser.entity";
@Entity()
export class UserLeave {
    @PrimaryGeneratedColumn()
    userLevaeId:number;

    @Column()
    availableLeaves:number;

    @Column()
    totalLeaves:number;


    @OneToOne(()=>Plazeruser,(plazeruserid)=>plazeruserid.userleave)
    @JoinColumn()
    plazeruserid:Plazeruser;



}
