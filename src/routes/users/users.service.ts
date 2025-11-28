import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async addUser(body: any) {
    const User = await this.prismaService.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    return User;
  }
}
