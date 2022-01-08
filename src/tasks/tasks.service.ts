import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }
  // private tasks: Task[] = [];
  // getAllTask(): Task[] {
  //   return this.tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    // Try to get task
    const found = await this.taskRepository.findOne(id);

    // if not found, throw an error (404 not found)
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // otherwise, return the found task
    return found;
  }

  // getTaskById(id: string): Task {
  //   // Try to get task
  //   const found = [...this.tasks]?.find((task) => task.id === id);
  //   // if not found, throw an error (404 not found)
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   // otherwise, return the found task
  //   return found;
  // }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  async updateTask(id: string, status: TaskStatus) {
    const task = await this.getTaskById(id);

    task.status = status;

    await this.taskRepository.save(task);
    return task;
  }

  // updateTask(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  deleteTask(id: string): Promise<void> {
    return this.taskRepository.removeTask(id);
  }

  // deleteTask(id: string): void {
  //   // Try to get task
  //   const found = this.getTaskById(id);
  //   // delete task
  //   this.tasks = [...this.tasks]?.filter((task) => task.id !== id);
  // }

  // getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   // Define a temporary array to hold the result
  //   let tasks = this.getAllTask();
  //   // Do something with status
  //   if (status) {
  //     tasks = tasks?.filter((task) => task.status === status);
  //   }
  //   // Do something with search
  //   if (search) {
  //     tasks = tasks?.filter((task) => {
  //       if (
  //         task?.title?.includes(search) ||
  //         task?.description?.includes(search)
  //       )
  //         return task;
  //     });
  //   }
  //   return tasks;
  // }
}
