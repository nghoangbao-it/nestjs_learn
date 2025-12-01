import { Body, ClassSerializerInterceptor, Controller, Delete, Param, Post, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterBodyDTO, RegisterResDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @SerializeOptions({ type: RegisterResDTO })
    async registerUser(@Body() body: RegisterBodyDTO){
        // console.log('RegisterBodyDTO:', body);
        // return body;
        const newUser = await this.authService.registerUser(body);
        return newUser
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const userId = parseInt(id);
        await this.authService.deleteUser(userId);
        return { message: 'User deleted successfully' };
    }
}
