import { ParameterError } from '@/errors/parameter-error';
import { Id } from '@Common/value-objects/id';

export type Todo = {};

export type TodoListParam = {
  todoListId: Id;
  name: string;
  todos: Todo[];
};

export class TodoList {
  private constructor(private param: TodoListParam) {}

  static readonly NAME_MAX_LENGTH = 24;
  static readonly NAME_MIN_LENGTH = 1;

  static createTodoList(name: string) {
    if (name.length > this.NAME_MAX_LENGTH) {
      throw new ParameterError(`nameは最大${this.NAME_MAX_LENGTH}文字です。`);
    }
    if (name.length < this.NAME_MIN_LENGTH) {
      throw new ParameterError(`nameは最小${this.NAME_MIN_LENGTH}文字です。`);
    }

    return new TodoList({
      todoListId: Id.generate(),
      name,
      todos: [],
    });
  }

  get id(): string {
    return this.param.todoListId.value;
  }

  get name(): string {
    return this.param.name;
  }
}
