import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserleaveDto {
    @IsNotEmpty()
    @IsNumber({},{each:true})
    readonly plazeruserid: number;

    
@IsNotEmpty()
@IsNumber()
tottotalLeaves:number;

@IsNotEmpty()
@IsNumber()
availableleaves:number;
    
}
