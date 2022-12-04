<script setup lang="ts">
import DomainTodoListItem from './todo-list-item.vue';
import { useTodoList } from '@/composables/useTodoList';

type Props = {
  injection: Symbol;
  selectIndex?: number;
};

const props = withDefaults(defineProps<Props>(), { selectIndex: -1 });

const todoList = inject<ReturnType<typeof useTodoList>>(props.injection);

if (todoList == null) {
  throw new Error('injection error');
}

const todoListItemRefs = ref<typeof DomainTodoListItem[]>([]);
const todos = computed(() => todoList.todos);

const select = (index: number) => {
  selectIndex.value = index;
};

const addNewTodo = async () => {
  if (!todoList) {
    throw new Error('didnt select todo list');
  }

  todoList.createNewTodo();

  await new Promise((r) =>
    setTimeout(() => {
      if (!todoList) {
        return;
      }

      selectIndex.value = todoList.length.value - 1;
      r(true);
    }, 50)
  );
};

const selectIndex = ref(props.selectIndex);
</script>

<template>
  <div>
    <div>
      <input
        type="text"
        :value="todoList.name.value"
        class="py-2 px-4 w-full"
        readonly
      />
    </div>
    <button
      @click="addNewTodo()"
      class="
        border-2
        shadow-md
        px-4
        py-2
        rounded-md
        m-2
        active:bg-gray-200
        transition-all
      "
    >
      追加
    </button>

    <div
      v-for="(todo, index) in todos.value"
      class="transition-all duration-400"
      :class="{ 'p-4': selectIndex == index }"
    >
      <DomainTodoListItem
        ref="todoListItemRefs"
        :injection="props.injection"
        :index="index"
        :expand="selectIndex === index"
        @click="select(index)"
        :class="{ 'shadow-lg': selectIndex == index }"
      />
    </div>
  </div>
</template>
