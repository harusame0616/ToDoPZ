import { ConflictError } from '@/errors/conflict-error';
import { ParameterError } from '@/errors/parameter-error';
import { TodoList } from './todo-list';

describe('createTodoList', () => {
  describe('normal', () => {
    it.each([
      'a'.repeat(TodoList.NAME_MIN_LENGTH),
      'a'.repeat(TodoList.NAME_MAX_LENGTH),
    ])('正しい長さの名前', (todoName) => {
      const todoList = TodoList.createTodoList(todoName);

      expect(todoList.name).toBe(todoName);
    });
  });

  it.each([
    'a'.repeat(TodoList.NAME_MIN_LENGTH - 1),
    'a'.repeat(TodoList.NAME_MAX_LENGTH + 1),
  ])('名前の長さエラー', (todoName) => {
    expect(() => TodoList.createTodoList(todoName)).toThrow(ParameterError);
  });
});
