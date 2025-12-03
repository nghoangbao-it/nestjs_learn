import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './routes/posts/posts.module';
import { UsersModule } from './routes/users/users.module';
import { SharedModule } from './shared/shared.module';
import { HashingService } from './shared/services/hashing.service';
import { AuthModule } from './routes/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [PostsModule, UsersModule, SharedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, HashingService, {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  }],
  
})
export class AppModule {}
