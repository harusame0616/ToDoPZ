import TodoList from './todo-list.vue';
import { Meta, Story } from '@storybook/vue3';
import { useTodoList } from '@/composables/useTodoList';

export default {
  title: 'Domain/Todo/TodoList',
  component: TodoList,
};

const Template: Story = (args) => ({
  components: { TodoList },
  setup() {
    const injection = Symbol('todo-key');
    const todoList = useTodoList();

    todoList.createNewTodo();
    todoList.createNewTodo();
    todoList.createNewTodo();
    provide(injection, todoList);

    const selectIndex = ref(args.selectIndex ?? -1);

    return {
      injection,
      selectIndex,
    };
  },
  template: `<TodoList :injection="injection" v-model:selectIndex="selectIndex" />`,
});

export const Default: Meta = Template.bind({});
Default.args = {};

export const Selected: Meta = Template.bind({});
Selected.args = {
  selectIndex: 1,
};
