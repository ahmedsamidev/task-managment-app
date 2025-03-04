import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  dueDate?: Date;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({
    type: String,
    default: 'OTHERS',
    enum: ['WORK', 'PERSONAL', 'SHOPPING', 'HEALTH' ,'OTHERS'],
  })
  category?: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
