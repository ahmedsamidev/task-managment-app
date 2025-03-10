import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  linkedInUrl?: string;

  @Prop({
    type: Object,
    default: null,
  })
  linkedInProfile?: {
    name: string;
    profilePhoto: string;
    title: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
