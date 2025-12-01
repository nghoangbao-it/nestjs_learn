import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserLoginDTO {
  @IsString() email: string;
  @IsString() password: string;
}

export class RegisterBodyDTO extends UserLoginDTO {
  @IsString() name: string;
  @IsString() confirmPassword: string;
}

export class RegisterResDTO {
    id: number;
    email: string;
    name: string;
    @Exclude() password: string;
    createdAt: Date;
    updatedAt: Date;

    @Expose()
    get displayId() {
        return `USER-${this.id}`;
    }

    constructor(partial: Partial<RegisterResDTO>) {
        Object.assign(this, partial);
    }
}