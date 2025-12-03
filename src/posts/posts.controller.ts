import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { AuthType, ConditionGuard } from 'src/shared/constants/auth.constant';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  // @UseGuards(ApiKeyGuard)
  // @UseGuards(AccessTokenGuard)
  @Auth([AuthType.Bearer, AuthType.ApiKey], ConditionGuard.Or)
  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Post()
  addPost(@Body() body: any) {
    return this.postService.addPost(body);
  }

  @Get(':id')
  getPostDetail(@Param('id') id: number) {
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
