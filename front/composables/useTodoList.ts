import { Ref } from 'nuxt/dist/app/compat/capi';
import { FetchTodoListGateway } from '~~/gateways/todo-list/fetch-todo-list';
import { MockTodoListGateway } from '~~/gateways/todo-list/mock-todo-list';

type Todo = {
  todoId: string;
  title: string;
  note: string;
  deadline?: Date;
  scheduledStart?: Date;
  scheduledFinish?: Date;
  finishedAt?: Date;
};

type TodoList = {
  todoListId: string;
  name: string;
  todos: Todo[];
};

export type CreateTodoParam = {
  title: string;
  note: string;
};

export interface TodoListGateway {
  create(todoIdList: string, createTodoParam: CreateTodoParam): Promise<string>;
  finish(todoListId: string, todoId: string): Promise<Date>;
  resume(todoListId: string, todoId: string): Promise<void>;
  changeTitle(todoListId: string, todoId: string, title: string): Promise<void>;
  changeNote(todoListId: string, todoId: string, ntoe: string): Promise<void>;
}

const todoListGateway =
  import.meta.env.VITE_API === 'MOCK'
    ? new MockTodoListGateway()
    : new FetchTodoListGateway();

export const useTodoList = () => {
  const _todoList: Ref<TodoList> = ref({ todoListId: '', name: '', todos: [] });
  const isLoading = ref(false);

  const createNewTodo = async () => {
    const newTodoId = await todoListGateway.create(_todoList.value.todoListId);

    const newTodo = { todoId: newTodoId, title: '', note: '' };
    _todoList.value.todos.push(newTodo);
  };

  const deleteTodo = (index: number) => {
    _todoList.value.todos.splice(index, 1);
  };

  const finish = async (index: number) => {
    const finishingTodo = _todoList.value.todos[index];
    if (finishingTodo == null) {
      throw new Error('index error');
    }

    const finishedTime = await todoListGateway.finish(
      _todoList.value.todoListId,
      finishingTodo.todoId
    );
    finishingTodo.finishedAt = finishedTime;
  };

  const isFinished = (index: number) => {
    if (_todoList.value.todos[index] == null) {
      throw new Error('index error');
    }

    return !!_todoList.value.todos[index].finishedAt;
  };

  const resume = async (index: number) => {
    const resumingTodo = _todoList.value.todos[index];
    if (resumingTodo == null) {
      throw new Error('index error');
    }

    await todoListGateway.resume(
      _todoList.value.todoListId,
      resumingTodo.todoId
    );

    resumingTodo.finishedAt = undefined;
  };

  const changeTitle = async (index: number, title: string) => {
    const changingTitleTodo = _todoList.value.todos[index];
    if (changingTitleTodo == null) {
      throw new Error('index error');
    }

    await todoListGateway.changeTitle(
      _todoList.value.todoListId,
      changingTitleTodo.todoId,
      title
    );

    _todoList.value.todos[index].title = title;
  };

  const getTitle = (index: number) => {
    if (_todoList.value.todos[index] == null) {
      throw new Error('index error');
    }

    return _todoList.value.todos[index].title;
  };

  const changeNote = async (index: number, note: string) => {
    const changingNoteTodo = _todoList.value.todos[index];
    if (changingNoteTodo == null) {
      throw new Error('index error');
    }

    await todoListGateway.changeNote(
      _todoList.value.todoListId,
      changingNoteTodo.todoId,
      note
    );
    _todoList.value.todos[index].note = note;
  };

  const getNote = (index: number) => {
    if (_todoList.value.todos[index] == null) {
      throw new Error('index error');
    }

    return _todoList.value.todos[index].note;
  };

  const todos = computed(() => _todoList.value.todos);
  const length = computed(() => _todoList.value.todos.length);
  const name = computed(() => _todoList.value.name);

  const load = async (todoListId: string) => {
    isLoading.value = true;
    const todoList: TodoList = await $fetch('/api/todo-lists/' + todoListId);
    _todoList.value = todoList;
    isLoading.value = false;
  };

  return {
    createNewTodo,
    deleteTodo,
    finish,
    resume,
    changeTitle,
    changeNote,
    length,
    todos,
    name,
    isFinished,
    getNote,
    getTitle,
    load,
    isLoading,
  };
};
