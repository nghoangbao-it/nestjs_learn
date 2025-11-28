import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  getPosts() {
    return this.prismaService.post.findMany({})
  }

  getPostDetail(id: string) {
    return `Get Post Detail with id ${id}`;
  }

  addPost(body: any) {
    return body
  }

  updatePost(id: string, body: any) {
    return `Update Post ${id}`;
  }

  deletePost(id: string) {
    return `Delete Post ${id}`;
  }
}
