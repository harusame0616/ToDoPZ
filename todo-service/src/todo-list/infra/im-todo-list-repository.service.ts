import { Injectable } from '@nestjs/common';
import { TodoList } from '../domain/todo-list';
import { TodoListRepository } from '../application/todo-list-repository.interface';

@Injectable()
export class IMTodoListRepository implements TodoListRepository {
  public todoListDataStore: { [key: string]: TodoList } = {};
  async findOneByName(name: string): Promise<TodoList | null> {
    return (
      Object.values(this.todoListDataStore).find(
        (todoList) => todoList.name === name
      ) ?? null
    );
  }

  async findOneById(id: string): Promise<TodoList | null> {
    return (
      Object.values(this.todoListDataStore).find(
        (todoList) => todoList.id === id
      ) ?? null
    );
  }

  async save(todoList: TodoList): Promise<void> {
    this.todoListDataStore[todoList.id] = todoList;
  }
}
