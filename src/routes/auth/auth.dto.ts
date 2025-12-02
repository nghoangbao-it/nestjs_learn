import { Exclude, Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { SuccessResDTO } from 'src/shared/shared.dto';

export class LoginBodyDTO {
  @IsString() email: string;
  @IsString() password: string;
}

export class LoginResDTO {
  accessToken: string;
  refreshToken: string;
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString() name: string;
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