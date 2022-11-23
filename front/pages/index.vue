<script setup lang="ts">
const todoList = useTodoList();

const injectionKey = Symbol('todolist');
provide<typeof todoList>(injectionKey, todoList);

const addNewTodo = async () => {
  todoList.createNewTodo();

  await new Promise((r) =>
    setTimeout(() => {
      selectIndex.value = todoList.length.value - 1;
      r(true);
    }, 50)
  );
};

const selectIndex = ref(-1);
</script>

<template>
  <div>
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
    <DomainTodoList
      :injection="injectionKey"
      v-model:select-index="selectIndex"
    />
  </div>
</template>
