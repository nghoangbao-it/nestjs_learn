import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async registerUser(body: any) {
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
        if(error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new ConflictException('User with this email already exists');
        }
        throw error;
    }
  }


  async deleteUser(userId: number) {
    return await this.prismaService.user.delete({where: {id: userId}});
  }
}
