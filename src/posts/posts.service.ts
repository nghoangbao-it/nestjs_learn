import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  sayHello() {
    return 'Hello wordld';
  }

  getPosts() {
    return 'Get List Posts';
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
