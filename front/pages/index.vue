<script setup lang="ts">
const todoLists = useTodoLists();

const todoListName = ref('');
const createTodoListDialogIsOpen = ref(false);

const todoList = useTodoList();
const injectionKey = Symbol('todolist');
provide<typeof todoList>(injectionKey, todoList);

const loadTodoList = async (id: string) => {
  await todoList.load(id);
};

const newTodoListNameInputRef = ref<HTMLInputElement | null>(null);
const openCreateTodoListDialog = () => {
  todoListName.value = '';
  createTodoListDialogIsOpen.value = true;
  nextTick(() => {
    newTodoListNameInputRef.value?.focus();
  });
};

const createTodoList = async () => {
  const todoListId = await todoLists.createTodoList(todoListName.value);
  await Promise.all([todoLists.refresh(), todoList.load(todoListId)]);

  nextTick(() => {
    createTodoListDialogIsOpen.value = false;
  });
};

let selectedTodoListId = ref<string | undefined>(undefined);
const selectTodoList = (id: string) => {
  loadTodoList(id);
  selectedTodoListId.value = id;
};

const selectIndex = ref(-1);
</script>

<template>
  <div class="flex w-full h-full">
    <BasePopup :is-open="createTodoListDialogIsOpen">
      <div class="text-lg mb-8">新しいTodoList</div>
      <div class="text-sm">ToDoリストの名前</div>
      <input
        type="text"
        v-model="todoListName"
        placeholder="新しい ToDo リスト"
        class="border border-gray-300 px-4 py-2 w-48"
        ref="newTodoListNameInputRef"
      />
      <div class="mt-8">
        <button
          class="rounded-md border bg-slate-700 text-white p-2 w-full"
          @click="createTodoList()"
        >
          作成する
        </button>
      </div>
    </BasePopup>
    <div>
      <button
        @click="openCreateTodoListDialog"
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
        新しいリストを作成する
      </button>
      <menu>
        <template v-if="todoLists.isLoading.value"> now loading </template>
        <template v-else>
          <li
            v-for="todoList in todoLists.todoLists.value"
            class="
              px-4
              py-1
              transition-all
              duration-500
              text-shadow
              hover:bg-gray-100
              select-none
            "
            @click="selectTodoList(todoList.id)"
            :class="[
              todoList.id == selectedTodoListId
                ? 'shadow-md bg-gray-200 rounded-r-sm'
                : undefined,
            ]"
          >
            {{ todoList.name }}
          </li>
        </template>
      </menu>
    </div>
    <div class="flex-grow">
      <template v-if="selectedTodoListId">
        <DomainTodoList
          :injection="injectionKey"
          v-model:select-index="selectIndex"
        />
      </template>
    </div>
  </div>
</template>
