
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    name: string;

    @Prop()
    age: number;

    @Prop()
    email: string;

    @Prop()
    address: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)