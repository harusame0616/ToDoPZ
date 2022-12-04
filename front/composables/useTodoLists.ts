import { FetchTodoListsGateway } from '~~/gateways/todo-lists/fetch-todo-lists';
import { MockTodoListsGateway } from '~~/gateways/todo-lists/mock-todo-lists';

export type TodoLists = {
  id: string;
  name: string;
}[];

export interface TodoListsGateway {
  list(): Promise<TodoLists>;
  create(todoListName: string): Promise<string>;
}
const todoListsGateway =
  import.meta.env.VITE_API === 'MOCK'
    ? new MockTodoListsGateway()
    : new FetchTodoListsGateway();

export const useTodoLists = () => {
  const todoLists = ref<TodoLists>();
  const isLoading = ref(false);

  const refresh = async () => {
    isLoading.value = true;

    todoLists.value = await todoListsGateway.list();
    isLoading.value = false;
  };

  const createTodoList = async (name: string): Promise<string> => {
    return await todoListsGateway.create(name);
  };

  refresh();

  return {
    todoLists,
    createTodoList,
    isLoading,
    refresh,
  };
};
