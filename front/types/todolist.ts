
export type NewTodo = {
  title: string;
  note: string;
  deadline?: Date;
  scheduledStart?: Date;
  scheduledFinish?: Date;
  finishedAt?: Date;
};

export type Todo = NewTodo & {
  todoId: string;
};

export type TodoList = {
  todoListId: string;
  name: string;
  todos: (Todo | NewTodo)[];
};