import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterBodyDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async registerUser(@Body() body: RegisterBodyDTO) {
        // console.log('RegisterBodyDTO:', body);
        // return body;
        return await this.authService.registerUser(body);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const userId = parseInt(id);
        await this.authService.deleteUser(userId);
        return { message: 'User deleted successfully' };
    }
}
