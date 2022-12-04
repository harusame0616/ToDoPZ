import { CreateTodoParam, TodoListGateway } from '~~/composables/useTodoList';

export class FetchTodoListGateway implements TodoListGateway {
  async create(todoListId: string) {
    const { todoId } = (await $fetch(`/api/todo-lists/${todoListId}/todos`, {
      method: 'POST',
      body: {
        title: '',
        note: '',
      },
    })) as any;

    return todoId;
  }

  async resume(todoListId: string, todoId: string) {
    await $fetch(`/api/todo-lists/${todoListId}/todos/${todoId}`, {
      method: 'POST',
      body: {
        isFinished: true,
      },
    });
  }

  async finish(todoListId: string, todoId: string) {
    return (await $fetch(`/api/todo-lists/${todoListId}/todos/${todoId}`, {
      method: 'POST',
      body: {
        isFinished: true,
      },
    })) as Date;
  }

  async changeTitle(todoListId: string, todoId: string, title: string) {
    await $fetch(`/api/todo-lists/${todoListId}/todos/${todoId}`, {
      method: 'POST',
      body: {
        title,
      },
    });
  }

  async changeNote(todoListId: string, todoId: string, note: string) {
    await $fetch(`/api/todo-lists/${todoListId}/todos/${todoId}`, {
      method: 'POST',
      body: {
        note,
      },
    });
  }
}
