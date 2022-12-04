import { Module } from '@nestjs/common';
import { IMTodoListRepository } from 'todo-list/infra/im-todo-list-repository.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IMTodoListQuery } from './todo-list/infra/im-todo-list-query.service';
import { TodoListController } from './todo-list/presentation/todo-list.controller';

const repository = new IMTodoListRepository();
const query = new IMTodoListQuery(repository.todoListDataStore)

@Module({
  imports: [],
  controllers: [AppController, TodoListController],
  providers: [
    AppService,
    {
      provide: 'TodoListRepository',
      // useClass: IMTodoListRepository,
      useFactory() {
        return repository;
      },
    },
    {
      provide: 'TodoListQuery',
      // useClass: IMTodoListRepository,
      useFactory() {
        return query;
      },
    },
  ],
})
export class AppModule {}
