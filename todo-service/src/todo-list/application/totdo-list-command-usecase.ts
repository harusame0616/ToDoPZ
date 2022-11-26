import { TodoListDomainService } from '@/todo-list/domain-service/todo-list-domain-service';
import { TodoListRepository } from './todo-list-repository.interface';

export class TodoListCommandUsecase {
  private todoListDomainService: TodoListDomainService;

  constructor(private todoListRepository: TodoListRepository) {
    this.todoListDomainService = new TodoListDomainService(todoListRepository);
  }

  async createTodoList(todoListName: string) {
    const todoList = await this.todoListDomainService.createTodoList(
      todoListName,
    );

    await this.todoListRepository.save(todoList);
    return {
      todoListId: todoList.id,
    };
  }
}
