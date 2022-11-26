import { Module } from '@nestjs/common';
import { IMTodoListRepository } from 'todo-list/infra/im-todo-list-repository.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoListController } from './todo-list/presentation/todo-list.controller';

@Module({
  imports: [],
  controllers: [AppController, TodoListController],
  providers: [
    AppService,
    {
      provide: 'TodoListRepository',
      useClass: IMTodoListRepository,
    },
  ],
})
export class AppModule {}
