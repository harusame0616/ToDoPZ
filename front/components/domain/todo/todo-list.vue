<script setup lang="ts">
import DomainTodoListItem from './todo-list-item.vue';
import { useTodoList } from '@/composables/useTodoList';

type Props = {
  injection: Symbol;
  selectIndex: number;
};
type Emits = {
  (e: 'update:selectIndex', index: number): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const todoList = inject<ReturnType<typeof useTodoList>>(props.injection);
if (!todoList) {
  throw Error('Injection Error');
}

const todoListItemRefs = ref<typeof DomainTodoListItem[]>([]);

const selectIndex = computed(() => props.selectIndex);

const select = (index: number) => {
  emits('update:selectIndex', index);
};

watchEffect(() => {
  const selectIndex = props.selectIndex;
  if (selectIndex < 0) {
    return;
  }

  todoListItemRefs.value[selectIndex]?.focusTitle();
});
</script>

<template>
  <div>
    <div
      v-for="(_, index) of todoList.todos"
      class="transition-all duration-400"
      :class="{ 'p-4': selectIndex == index }"
    >
      <DomainTodoListItem
        ref="todoListItemRefs"
        :injection="props.injection"
        :index="index"
        :expand="selectIndex == index"
        @click="select(index)"
        :class="{ 'shadow-lg': selectIndex == index }"
      />
    </div>
  </div>
</template>
