import { TodoList } from '../domain/todo-list';


export interface TodoListRepository {
  save(todoList: TodoList): Promise<void>;
  findOneByName(name: string): Promise<TodoList | null>;
}
