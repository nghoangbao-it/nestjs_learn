import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Get()
  sayHello() {
    return this.postService.sayHello();
  }

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Post()
  addPost(@Body() body: any) {
    return this.postService.addPost(body);
  }

  @Get(':id')
  getPostDetail(@Param('id') id: string) {
    return this.postService.getPostDetail(id);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() body: any) {
    return this.postService.updatePost(id, body);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
