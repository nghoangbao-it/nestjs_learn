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
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';
import { CreatePostBodyDTO, GetPostItemDTO } from './posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  // @UseGuards(ApiKeyGuard)
  // @UseGuards(AccessTokenGuard)
  // @Auth([AuthType.Bearer, AuthType.ApiKey], ConditionGuard.Or)
  @Get()
  @Auth([AuthType.Bearer])
  async getPosts(@ActiveUser('userId') userId: number) {
    const listPosts = await this.postService.getPosts(userId);
    return listPosts.map((post) => new GetPostItemDTO(post))
  }

  @Post()
  @Auth([AuthType.Bearer])
  addPost(@Body() body: CreatePostBodyDTO, @ActiveUser('userId') userId: number) {
    return this.postService.addPost(userId, body);
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
