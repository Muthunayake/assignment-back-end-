import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString, IsEmail } from "class-validator";

export class RegisterDTO {

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
