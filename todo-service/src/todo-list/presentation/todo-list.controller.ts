import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Length, IsNotEmpty, IsString } from 'class-validator';
import { TodoListRepository } from '@/todo-list/application/todo-list-repository.interface';
import { TodoListCommandUsecase } from '@/todo-list/application/totdo-list-command-usecase';
import { TodoList } from '../domain/todo-list';

export class CreateTodoListRequest {
  @IsNotEmpty()
  @IsString()
  @Length(TodoList.NAME_MIN_LENGTH, TodoList.NAME_MAX_LENGTH)
  name: string;
}

export type CreateTodoListResponse = {
  todoListId: string;
};

@Controller('todo-lists')
export class TodoListController {
  private readonly todoListUsecase;

  constructor(
    @Inject('TodoListRepository')
    readonly todoListRepository: TodoListRepository,
  ) {
    this.todoListUsecase = new TodoListCommandUsecase(todoListRepository);
  }

  @Post()
  async createTodoList(
    @Body() { name }: CreateTodoListRequest,
  ): Promise<CreateTodoListResponse> {
    return await this.todoListUsecase.createTodoList(name);
  }
}
