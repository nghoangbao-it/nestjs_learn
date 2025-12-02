import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { TokenService } from 'src/shared/services/token.service';
import {
  LoginBodyDTO,
  RefreshTokenBodyDTO,
  RegisterBodyDTO,
} from './auth.dto';
import { isEmail } from 'class-validator';
import {
  isRecordNotFoundPrismaError,
  isUniqueContraintPrismaError,
} from 'src/shared/helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
  ) {}

  async loginUser(body: LoginBodyDTO) {
    if (!isEmail(body.email)) {
      throw new UnprocessableEntityException('Email format is invalid');
    }
    const user = await this.prismaService.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    console.log('user:', user);
    console.log('password:', body.password);
    const isPassswordValid = this.hashingService.compare(
      body.password,
      user.password,
    );
    console.log('isPassswordValid:', isPassswordValid);
    if (!isPassswordValid) {
      throw new UnauthorizedException('Password is incorrect');
    }
    const tokens = await this.generateTokens(user.id);
    return tokens;
  }

  async generateTokens(userId: number) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken({ userId }),
      this.tokenService.signRefreshToken({ userId }),
    ]);

    const payload = await this.tokenService.verifyRefreshToken(refreshToken);
    await this.prismaService.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userId,
        expireAt: new Date(payload.exp * 1000),
      },
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(body: RefreshTokenBodyDTO) {
    try {
      const token = body.refreshToken;
      const payload = await this.tokenService.verifyRefreshToken(token);
      const storedToken =
        await this.prismaService.refreshToken.findUniqueOrThrow({
          where: { token: token },
        });
      await this.prismaService.refreshToken.delete({ where: { token: token } });
      const tokens = await this.generateTokens(payload.userId);
      return tokens;
    } catch (error) {
      if (isRecordNotFoundPrismaError(error)) {
        throw new UnauthorizedException('Refresh token was invoked');
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async registerUser(body: RegisterBodyDTO) {
    try {
      const hashedPassword = this.hashingService.hashData(body.password);
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: hashedPassword,
        },
      });
      return user;
    } catch (error) {
      if (isUniqueContraintPrismaError(error)) {
        throw new ConflictException('User with this email already exists');
      }
      throw error;
    }
  }

  async deleteUser(userId: number) {
    return await this.prismaService.user.delete({ where: { id: userId } });
  }
}
