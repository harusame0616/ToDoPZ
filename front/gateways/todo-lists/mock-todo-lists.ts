import { TodoLists, TodoListsGateway } from '~~/composables/useTodoLists';

export class MockTodoListsGateway implements TodoListsGateway {
  todoLists = [
    {
      id: crypto.randomUUID(),
      name: 'todoList1',
    },
    {
      id: crypto.randomUUID(),
      name: 'todoList2',
    },
    {
      id: crypto.randomUUID(),
      name: 'todoList3',
    },
  ];
  async list(): Promise<TodoLists> {
    return [...this.todoLists];
  }

  async create(todoListName: string): Promise<string> {
    const todo = {
      id: crypto.randomUUID(),
      name: todoListName,
    };
    this.todoLists.push(todo);

    return todo.id;
  }
}
