import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { NotFoundError } from 'rxjs';
import { UpdatePasswordDTO } from './dto/update-password.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async create(CreateUserDTO: CreateUserDTO): Promise<User> {
        const createdUser = new this.userModel(CreateUserDTO);
        return createdUser.save();
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async updatePassword(UpdatePasswordDTO: UpdatePasswordDTO): Promise<User> {
        const user = await this.findByEmail(UpdatePasswordDTO.email);
        user.password = UpdatePasswordDTO.newPassword;
        return user.save();
    }
}
