<script setup lang="ts">
import { useTodoList } from '@/composables/useTodoList';

type Props = {
  injection: Symbol;
  index: number;
  expand: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  expand: false,
});

const todoList = inject<ReturnType<typeof useTodoList>>(props.injection);
if (!todoList) {
  throw new Error('injection error');
}

const noteIsFocused = ref(false);
const noteInputRef = ref<HTMLDivElement>();
const titleInputRef = ref<HTMLInputElement>();

const backgroundColor = computed(() =>
  props.expand ? 'bg-gray-200' : undefined
);
const isFinished = computed({
  get: () => todoList.isFinished(props.index),
  set: (isFinished: boolean) => {
    if (isFinished) {
      todoList.finish(props.index);
      return;
    }

    todoList.resume(props.index);
  },
});
const title = computed({
  get: () => todoList.getTitle(props.index),
  set: (title: string) => todoList.changeTitle(props.index, title),
});
const note = computed(() => todoList.getNote(props.index));
const contentClasses = computed(() =>
  props.expand ? ['max-h-screen', 'p-4', 'overflow-y-auto'] : ['max-h-0']
);

const changeNote = (note: string) => {
  todoList.changeNote(props.index, note);
};
const focusNote = () => {
  noteIsFocused.value = true;
};
const leaveNote = () => {
  noteIsFocused.value = false;
  changeNote(noteInputRef.value?.textContent ?? '');
};

defineExpose({
  focusTitle: () => {
    nextTick(() => {
      titleInputRef.value?.focus();
    });
  },
});
</script>

<template>
  <BaseListItem class="transition-all duration-500" :class="backgroundColor">
    <div class="flex">
      <BaseCheckbox v-model="isFinished" />
      <input
        class="bg-gray-200/0 text-sm outline-none w-full"
        v-model="title"
        placeholder="新規 Todo"
        ref="titleInputRef"
      />
    </div>
    <div
      class="transition-all overflow-hidden duration-700 relative"
      :class="contentClasses"
    >
      <div
        contenteditable
        class="
          whitespace-pre-wrap
          outline-none
          bg-gray-200/0
          w-full
          inline-block
        "
        @blur="leaveNote"
        @focus="focusNote"
        ref="noteInputRef"
      >
        {{ note }}
      </div>
      <div
        class="absolute top-4 text-gray-400 text-sm"
        v-if="!note.length && !noteIsFocused"
      >
        ノート
      </div>
    </div>
  </BaseListItem>
</template>
