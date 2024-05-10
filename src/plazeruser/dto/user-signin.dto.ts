import { IsNotEmpty, IsString } from "class-validator";

export class userSignInDto{
    @IsString()
  @IsNotEmpty({message:'name cannot null'})
  username: string;

  @IsString()
  upassword: string;

}