import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TaskService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, user);
  }

  // @Get()
  // getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   // if we have any filter defined, call tasksService.getTaskWithFilters
  //   // otherwise, just get all task
  //   if (Object.keys(filterDto)?.length) {
  //     return this.taskService.getTaskWithFilters(filterDto);
  //   } else {
  //     return this.taskService.getAllTask();
  //   }
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.taskService.getTaskById(id);
  // }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  // //   @Post()
  // //   createTask(
  // //     @Body('title') title: string,
  // //     @Body('description') description: string,
  // //   ): Task {
  // //     return this.taskService.createTask(title, description);
  // //   }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.taskService.createTask(createTaskDto);
  // }

  @Delete('/:id')
  async deleteTask(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    await this.taskService.deleteTask(id, user);
  }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   this.taskService.deleteTask(id);
  // }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTask(id, status, user);
  }

  // @Patch('/:id/status')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateTaskStatusDto;
  //   return this.taskService.updateTask(id, status);
  // }
}
