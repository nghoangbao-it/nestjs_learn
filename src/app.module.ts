import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './routes/users/users.module';
import { SharedModule } from './shared/shared.module';
import { HashingService } from './shared/services/hashing.service';
import { AuthModule } from './routes/auth/auth.module';

@Module({
  imports: [PostsModule, UsersModule, SharedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, HashingService],
})
export class AppModule {}
