import { IsString } from "class-validator";

export class UserLoginDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class RegisterBodyDTO extends UserLoginDTO {
  @IsString()
  name: string;

  @IsString()
  confirmPassword: string;
}
