import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  dueDate?: Date;

  @IsNotEmpty()
  completed: boolean;

  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  categoryId?: string;
}
