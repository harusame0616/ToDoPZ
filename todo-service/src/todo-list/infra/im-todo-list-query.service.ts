import { Injectable } from '@nestjs/common';
import {
  TodoListBrief,
  TodoListDetail,
  TodoListQuery,
} from '../application/todo-list-query.interface';
import { TodoList } from '../domain/todo-list';

@Injectable()
export class IMTodoListQuery implements TodoListQuery {
  constructor(private dataSource: { [key: string]: TodoList }) {}

  async getDetail(id: string): Promise<TodoListDetail | null> {
    const todoList = this.dataSource[id];

    if (todoList == null) {
      return null;
    }

    return {
      todoListId: todoList.id,
      name: todoList.name,
      todos: todoList.todos.map((todo) => ({
        ...todo,
        todoId: todo.todoId.value,
      })),
    };
  }

  async listTodoListBrief(): Promise<TodoListBrief[]> {
    return Object.values(this.dataSource).map(({ name, id }) => ({ name, id }));
  }
}
