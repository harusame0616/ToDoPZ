import { TodoList } from '../domain/todo-list';
import { TodoListRepository } from '../application/todo-list-repository.interface';
import { ConflictError } from '@/errors/conflict-error';

export class TodoListDomainService {
  constructor(private todoListRepository: TodoListRepository) {}

  public async createTodoList(name: string) {
    const todoListAlreadyExists = await this.todoListRepository.findOneByName(
      name,
    );

    if (todoListAlreadyExists) {
      throw new ConflictError('already exists same name todo list');
    }

    return TodoList.createTodoList(name);
  }
}
