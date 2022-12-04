import { TodoListQuery } from './todo-list-query.interface';

export class TodoListQueryUsecas {
  constructor(private todoListQuery: TodoListQuery) {}

  listTodoListBrief() {
    return this.todoListQuery.listTodoListBrief();
  }

  getDetail(id: string) {
    return this.todoListQuery.getDetail(id);
  }
}
