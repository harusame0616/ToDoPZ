import { TodoLists, TodoListsGateway } from '~~/composables/useTodoLists';

export class FetchTodoListsGateway implements TodoListsGateway {
  async list(): Promise<TodoLists> {
    return $fetch<Promise<TodoLists>>('/api/todo-lists/?brief=true', {
      baseURL: process.client ? '' : 'http://todo-service:3000/',
    }) as any;
  }

  async create(todoListName: string): Promise<string> {
    const response = (await $fetch('/api/todo-lists', {
      method: 'POST',
      body: {
        name: todoListName,
      },
    })) as any;

    return response.todoListId;
  }
}
