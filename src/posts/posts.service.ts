import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CreatePostBodyDTO, CreatePostResDTO } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  getPosts() {
    return this.prismaService.post.findMany();
  }

  async getPostDetail(id: number) {
    const postDetail = await this.prismaService.post.findUnique({
      where: { id },
    });
    return postDetail;
  }

  async addPost(body: CreatePostBodyDTO) {
    const newPost = await this.prismaService.post.create({
      data: body,
    });
    return new CreatePostResDTO(newPost);
  }

  updatePost(id: string, body: any) {
    return `Update Post ${id}`;
  }

  deletePost(id: string) {
    return `Delete Post ${id}`;
  }
}
