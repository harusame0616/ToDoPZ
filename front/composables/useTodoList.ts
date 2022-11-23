type NewTodo = {
  title: string;
  note: string;
  deadline?: Date;
  scheduledStart?: Date;
  scheduledFinish?: Date;
  finishedAt?: Date;
};

type Todo = NewTodo & {
  todoId: string;
};

type NewTodoList = {
  todos: (Todo | NewTodo)[];
};

type TodoList = NewTodoList & {
  todoListId: string;
};

export const useTodoList = (
  todoList: TodoList | NewTodoList = { todos: [] }
) => {
  const _todoList = ref(todoList);

  const createNewTodo = () => {
    _todoList.value.todos.push({ title: '', note: '' });
  };

  const deleteTodo = (index: number) => {
    _todoList.value.todos.splice(index, 1);
  };

  const finish = (index: number) => {
    if (_todoList.value.todos[index] == null) {
      throw new Error('index error');
    }

    _todoList.value.todos[index].finishedAt = new Date();
  };

  const isFinished = (index: number) => {
    if (_todoList.value.todos[index] == null) {
      throw new Error('index error');
    }

    return !!_todoList.value.todos[index].finishedAt;
  };

  const resume = (index: number) => {
    if (_todoList.value.todos[index] == null) {
      throw new Error('index error');
    }

    _todoList.value.todos[index].finishedAt = undefined;
  };

  const changeTitle = (index: number, title: string) => {
    if (_todoList.value.todos[index] == null) {
      throw new Error('index error');
    }

    _todoList.value.todos[index].title = title;
  };

  const getTitle = (index: number) => {
    if (_todoList.value.todos[index] == null) {
      throw new Error('index error');
    }

    return _todoList.value.todos[index].title;
  };

  const changeNote = (index: number, note: string) => {
    if (_todoList.value.todos[index] == null) {
      throw new Error('index error');
    }
    _todoList.value.todos[index].note = note;
  };

  const getNote = (index: number) => {
    if (_todoList.value.todos[index] == null) {
      throw new Error('index error');
    }

    return _todoList.value.todos[index].note;
  };

  const length = computed(() => _todoList.value.todos.length);

  return {
    createNewTodo,
    deleteTodo,
    finish,
    resume,
    changeTitle,
    changeNote,
    length,
    todos: _todoList.value.todos,
    isFinished,
    getNote,
    getTitle,
  };
};
