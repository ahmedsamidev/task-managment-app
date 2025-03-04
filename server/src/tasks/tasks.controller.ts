import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { User } from 'src/schema/user.schema';
import { CreateTaskDto } from './dtos/CreateTask.dto';
import { IdParamDto } from './dtos/IdParam.dto';

@Controller('tasks')
@UseGuards(JwtGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

 @Get()
getUserTasks(
  @Req() request: Request,
  @Query('category') category?: string,
  @Query('sort') sort?: 'asc' | 'desc',
  @Query('sortField') sortField?: 'createdAt' | 'updatedAt'  // ✅ New query param
) {
  const { _id } = request.user as User;
  return this.tasksService.getUserTasks(_id as string, category, sort, sortField);
}

  @Post()
  AddNewTask(@Body() taskData: CreateTaskDto, @Req() request: Request) {
    const { _id } = request.user as User;
    console.log(_id);

    const newTask = this.tasksService.addNewTask(taskData, _id as string);

    return newTask;
  }

  @Delete(':id')
  DeleteTask(@Param() { id }: IdParamDto, @Req() request: Request) {
    const { _id } = request.user as User;

    return this.tasksService.deleteTask(id, _id as string);
  }

  @Patch(':id')
  UpdateUserTask(
    @Body() newTaskData: any,
    @Param() { id }: IdParamDto,
    @Req() request: Request,
  ) {
    const { _id } = request.user as User;
    return this.tasksService.updateUserTask(id, newTaskData, _id as string);
  }
}
