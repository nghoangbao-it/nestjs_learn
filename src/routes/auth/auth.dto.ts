import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { Match } from 'src/shared/decorators/custom-validator.decorator';
import { SuccessResDTO } from 'src/shared/shared.dto';

export class LoginBodyDTO {
  @IsString() email: string;
  @Length(6, 32, { message: 'Password must be between 6 and 32 characters' })
  @IsString() password: string;
}

export class LoginResDTO {
  accessToken: string;
  refreshToken: string;
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString() name: string;
  @Match('password')
  @IsString() confirmPassword: string;
}

export class RegisterResDTO {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  @Exclude() declare password: string;

  constructor(partial: Partial<RegisterResDTO>) {
    Object.assign(this, partial);
  }
}

export class RefreshTokenBodyDTO {
  @IsString() refreshToken: string;
}

export class RefreshTokenResDTO extends LoginResDTO {}

export class LogoutBodyDTO extends RefreshTokenBodyDTO {}
export class LogoutResDTO {message: string;}