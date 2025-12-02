import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDTO, RefreshTokenBodyDTO, RegisterBodyDTO, RegisterResDTO } from './auth.dto';
import { RefreshToken } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() body: LoginBodyDTO) {
    const tokens = await this.authService.loginUser(body);
    return tokens;
  }

  @Post('register')
//   @SerializeOptions({ type: RegisterResDTO })
  async registerUser(@Body() body: RegisterBodyDTO) {
    const newUser = await this.authService.registerUser(body);
    // return newUser
    return new RegisterResDTO(newUser);
  }

  @Post('refresh-token')
  @HttpCode(200)
  async refreshToken(@Body() body: RefreshTokenBodyDTO) {
    const tokens = await this.authService.refreshTokens(body);
    return tokens;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const userId = parseInt(id);
    await this.authService.deleteUser(userId);
    return { message: 'User deleted successfully' };
  }
}
