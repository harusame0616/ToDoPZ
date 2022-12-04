import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Param,
  Query,
  ParseBoolPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  Length,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { TodoListRepository } from '@/todo-list/application/todo-list-repository.interface';
import { TodoListCommandUsecase } from '@/todo-list/application/totdo-list-command-usecase';
import { AddTodoParam, TodoList, TodoListDto } from '../domain/todo-list';
import { TodoListQueryUsecas } from '../application/todo-list-query-usecase';
import {
  TodoListBrief,
  TodoListQuery,
} from '../application/todo-list-query.interface';
import { ParameterError } from '@/errors/parameter-error';

export class CreateTodoListRequest {
  @IsNotEmpty()
  @IsString()
  @Length(TodoList.NAME_MIN_LENGTH, TodoList.NAME_MAX_LENGTH)
  name: string;
}

export class AddTodoRequest {
  @IsNotEmpty()
  @IsString()
  @Length(TodoList.TODO_LIST_ID_MIN_LENGTH, TodoList.TODO_LIST_ID_MAX_LENGTH)
  todoListId: string;

  @IsNotEmpty()
  @IsString()
  @Length(TodoList.TODO_TITLE_MIN_LENGTH, TodoList.TODO_TITLE_MAX_LENGTH)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(TodoList.TODO_NOTE_MIN_LENGTH, TodoList.TODO_NOTE_MAX_LENGTH)
  note: string;
}

export class UpdateTodoRequest {
  @IsString()
  @Length(TodoList.TODO_TITLE_MIN_LENGTH, TodoList.TODO_TITLE_MAX_LENGTH)
  @IsOptional()
  title?: string;

  @IsString()
  @Length(TodoList.TODO_NOTE_MIN_LENGTH, TodoList.TODO_NOTE_MAX_LENGTH)
  @IsOptional()
  note?: string;

  @IsBoolean()
  @IsOptional()
  isFinished?: boolean;
}

export type CreateTodoListResponse = {
  todoListId: string;
};

export type GetTodoListDetailResponse = TodoListDto | null;
export type ListTodoListResponse = TodoListBrief[];
export type AddTodoListResponse = { todoId: string };

@Controller('todo-lists')
export class TodoListController {
  private readonly todoListCommandUsecase;
  private readonly todoListQueryUsecase;

  constructor(
    @Inject('TodoListRepository')
    readonly todoListRepository: TodoListRepository,
    @Inject('TodoListQuery')
    readonly todoListQuery: TodoListQuery,
  ) {
    this.todoListCommandUsecase = new TodoListCommandUsecase(
      todoListRepository,
    );
    this.todoListQueryUsecase = new TodoListQueryUsecas(todoListQuery);
  }

  @Get()
  listTodoList(
    @Query('brief', ParseBoolPipe) brief: boolean,
  ): Promise<ListTodoListResponse> {
    if (brief) {
      return this.todoListQueryUsecase.listTodoListBrief();
    }

    throw new ParameterError('require brief option');
  }

  @Post()
  async createTodoList(
    @Body() { name }: CreateTodoListRequest,
  ): Promise<CreateTodoListResponse> {
    return await this.todoListCommandUsecase.createTodoList(name);
  }

  @Get(':todoListId')
  async getTodoList(
    @Param('todoListId', ParseUUIDPipe) todoListId: string,
  ): Promise<GetTodoListDetailResponse> {
    return await this.todoListQueryUsecase.getDetail(todoListId);
  }

  @Post(':id/todos')
  async addTodo(
    @Param('id', ParseUUIDPipe) todoListId: string,
    @Body() todoParam: AddTodoParam,
  ): Promise<AddTodoListResponse> {
    return await this.todoListCommandUsecase.addTodo(todoListId, todoParam);
  }

  @Post(':todoListId/todos/:todoId')
  async updateTodo(
    @Param('todoListId', ParseUUIDPipe) todoListId: string,
    @Param('todoId', ParseUUIDPipe) todoId: string,
    @Body() updateTodoParam: UpdateTodoRequest,
  ): Promise<void> {
    return await this.todoListCommandUsecase.updateTodo(
      todoListId,
      todoId,
      updateTodoParam,
    );
  }
}
