import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TaskService } from './tasks/tasks.service';

@Module({
  imports: [TasksModule],
  providers: [TaskService],
})
export class AppModule {}
