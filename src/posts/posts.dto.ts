import { IsNumber, IsString } from 'class-validator';

export class CreatePostBodyDTO {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsNumber()
  authorId: number;
}

export class CreatePostResDTO extends CreatePostBodyDTO {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<CreatePostResDTO>) {
    super();
    Object.assign(this, partial);
  }
}
