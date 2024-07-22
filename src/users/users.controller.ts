import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { get } from 'https';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './schemas/users.schema';
import { UpdatePasswordDTO } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post()
    async create(@Body() CreateUserDTO:CreateUserDTO): Promise<User> {
        return this.userService.create(CreateUserDTO);
    }

    @Get(':email')
    async findByEmail(@Param('email') email: string): Promise<User> {
        return this.userService.findByEmail(email);
    }

    @Patch('password')
    async updatePassword(@Body() UpdatePasswordDTO:UpdatePasswordDTO): Promise<User> {
        return this.userService.updatePassword(UpdatePasswordDTO)
    }
}
