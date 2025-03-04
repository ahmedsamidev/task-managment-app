import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schema/task.schema';
import { CreateTaskDto } from './dtos/CreateTask.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}
 async getUserTasks(
  userId: string,
  category?: string,
  sortBy: 'asc' | 'desc' = 'desc',
  sortField: 'createdAt' | 'updatedAt' = 'createdAt'  // ✅ New parameter
) {
  const query = { userId };

  if (category) {
    query['category'] = category;
  }

  const userTasks = await this.taskModel
    .find(query)
    .sort({ [sortField]: sortBy === 'asc' ? 1 : -1 });  // ✅ Dynamic sorting

  return userTasks;
}

  async addNewTask(taskData: CreateTaskDto, userId: string) {
    const newTask = new this.taskModel({ ...taskData, userId });
    return await newTask.save();
  }

  async deleteTask(taskId: string, userId: string) {
    const result = await this.taskModel.findOneAndDelete({
      _id: taskId,
      userId,
    });

    if (!result) {
      throw new HttpException(
        "You don't have the right to do that",
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Task deleted successfully',
      taskId,
    };
  }

  async updateUserTask(taskId: string, newTaskData: any, userId) {
    const result = await this.taskModel.findOneAndUpdate(
      { _id: taskId, userId },
      newTaskData,
      { new: true },
    );

    if (!result) {
      throw new HttpException(
        "You don't have the right to update this task",
        HttpStatus.UNAUTHORIZED,
      );
    }

    return result;
  }
}
