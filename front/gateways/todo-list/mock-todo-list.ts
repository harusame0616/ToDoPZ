import { TodoListGateway } from '~~/composables/useTodoList';

export class MockTodoListGateway implements TodoListGateway {
  todos = [];

  async create(todoListId: string) {
    return crypto.randomUUID();
  }

  async resume(todoListId: string, todoId: string) {}

  async finish(todoListId: string, todoId: string) {
    return new Date();
  }

  async changeTitle(todoListId: string, todoId: string, title: string) {}

  async changeNote(todoListId: string, todoId: string, note: string) {}
}
