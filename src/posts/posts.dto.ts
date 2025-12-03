import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostBodyDTO {
  @IsString()
  title: string;
  @IsString()
  content: string;
}

export class CreatePostResDTO extends CreatePostBodyDTO {
  id: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<CreatePostResDTO>) {
    super();
    Object.assign(this, partial);
  }
}
