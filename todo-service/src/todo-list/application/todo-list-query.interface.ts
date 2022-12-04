import { TodoListDto } from '../domain/todo-list';

export type TodoListBrief = {
  id: string;
  name: string;
};

export type TodoListDetail = TodoListDto;

export interface TodoListQuery {
  listTodoListBrief(): Promise<TodoListBrief[]>;
  getDetail(id: string): Promise<TodoListDetail | null>;
}
