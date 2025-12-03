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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDTO, LogoutBodyDTO, RefreshTokenBodyDTO, RegisterBodyDTO, RegisterResDTO } from './auth.dto';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';

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

  @Post('logout')
  async logout(@Body() body: LogoutBodyDTO) {
    return this.authService.logout(body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const userId = parseInt(id);
    await this.authService.deleteUser(userId);
    return { message: 'User deleted successfully' };
  }
}
