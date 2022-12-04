import { NotFoundError } from '@/errors/not-found-error';
import { TodoListDomainService } from '@/todo-list/domain-service/todo-list-domain-service';
import { Id } from '@Common/value-objects/id';
import { AddTodoParam } from '../domain/todo-list';
import { TodoListRepository } from './todo-list-repository.interface';

export type UpdateTodoParam = {
  title?: string;
  note?: string;
  isFinished?: boolean;
};

export class TodoListCommandUsecase {
  private todoListDomainService: TodoListDomainService;

  constructor(private todoListRepository: TodoListRepository) {
    this.todoListDomainService = new TodoListDomainService(todoListRepository);
  }

  async createTodoList(todoListName: string) {
    const todoList = await this.todoListDomainService.createTodoList(
      todoListName
    );

    await this.todoListRepository.save(todoList);
    return {
      todoListId: todoList.id,
    };
  }

  async addTodo(todoListId: string, addTodoParam: AddTodoParam) {
    const todoList = await this.todoListRepository.findOneById(todoListId);

    if (!todoList) {
      throw new NotFoundError('TodoList is not found.');
    }

    const todoId = todoList.addTodo(addTodoParam);
    await this.todoListRepository.save(todoList);

    return { todoId };
  }

  async updateTodo(
    todoListId: string,
    todoId: string,
    { isFinished, title, note }: UpdateTodoParam
  ) {
    const todoList = await this.todoListRepository.findOneById(todoListId);

    if (!todoList) {
      throw new NotFoundError('TodoList is not found.');
    }

    const changeTargetId = new Id(todoId);
    if (title != null) {
      todoList.changeTodoTitle(changeTargetId, title);
    }

    if (note != null) {
      todoList.changeTodoNote(changeTargetId, note);
    }

    if (isFinished != null) {
      if (isFinished === true) {
        todoList.finishTodo(changeTargetId);
      } else {
        todoList.resumeTodo(changeTargetId);
      }
    }
  }
}
