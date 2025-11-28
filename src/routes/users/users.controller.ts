import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService) {}

    @Post()
    addUser(@Body() body:any) {
        return this.userService.addUser(body)
    }
}
