import { NotFoundError } from '@/errors/not-found-error';
import { ParameterError } from '@/errors/parameter-error';
import { Id } from '@Common/value-objects/id';

export type Todo = {
  todoId: Id;
  title: string;
  note: string;
  deadline?: Date;
  scheduledStart?: Date;
  scheduledFinish?: Date;
  finishedAt?: Date;
};

export type TodoDto = Omit<Todo, 'todoId'> & {
  todoId: string;
};

export type AddTodoParam = {
  title: string;
  note: string;
};

export type TodoListParam = {
  todoListId: Id;
  name: string;
  todos: Todo[];
};

export type TodoListDto = {
  todoListId: string;
  name: string;
  todos: TodoDto[];
};

export class TodoList {
  private constructor(private param: TodoListParam) {}

  static readonly TODO_LIST_ID_MIN_LENGTH = Id.LENGTH;
  static readonly TODO_LIST_ID_MAX_LENGTH = Id.LENGTH;

  static readonly NAME_MAX_LENGTH = 24;
  static readonly NAME_MIN_LENGTH = 1;

  static readonly TODO_TITLE_MAX_LENGTH = 64;
  static readonly TODO_TITLE_MIN_LENGTH = 0;
  static readonly TODO_NOTE_MAX_LENGTH = 1024;
  static readonly TODO_NOTE_MIN_LENGTH = 0;

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
  get todos(): Todo[] {
    return [...this.param.todos];
  }

  addTodo(newTodoParam: AddTodoParam) {
    const todoId = Id.generate();

    this.param.todos.push({
      ...newTodoParam,
      todoId,
    });

    return todoId.value;
  }

  changeTodoTitle(todoId: Id, title: string) {
    const todo = this.todos.find((todo) => todo.todoId.equals(todoId));
    if (!todo) {
      throw new NotFoundError('Todo is not found');
    }

    todo.title = title;
  }

  changeTodoNote(todoId: Id, note: string) {
    const todo = this.todos.find((todo) => todo.todoId.equals(todoId));
    if (!todo) {
      throw new NotFoundError('Todo is not found');
    }

    todo.note = note;
  }

  finishTodo(todoId: Id) {
    const todo = this.todos.find((todo) => todo.todoId.equals(todoId));
    if (!todo) {
      throw new NotFoundError('Todo is not found');
    }

    todo.finishedAt = new Date();
  }

  resumeTodo(todoId: Id) {
    const todo = this.todos.find((todo) => todo.todoId.equals(todoId));
    if (!todo) {
      throw new NotFoundError('Todo is not found');
    }

    todo.finishedAt = undefined;
  }
}
