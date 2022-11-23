<script setup lang="ts">
type Props = {
  modelValue: boolean;
  small?: boolean;
  large?: boolean;
};
type Emits = {
  (e: 'update:modelValue', isChecked: boolean): void;
};

const props = withDefaults(defineProps<Props>(), {
  small: false,
  large: false,
});
const emits = defineEmits<Emits>();

const boxSize = computed(() => {
  if (props.small) {
    return 'w-3 h-3';
  }
  if (props.large) {
    return 'w-5 h-5';
  }

  return 'w-4 h-4';
});
const labelSize = computed(() => {
  if (props.small) {
    return 'text-xs';
  }
  if (props.large) {
    return 'text-xl';
  }

  return 'text-base';
});
const isChecked = computed({
  get: () => props.modelValue,
  set: (isChecked: boolean) => {
    emits('update:modelValue', isChecked);
  },
});
</script>

<template>
  <label class="flex flex-row items-center">
    <input
      type="checkbox"
      class="rounded-md mr-1"
      :class="[boxSize]"
      v-model="isChecked"
    />
    <div :class="[labelSize]">
      <slot></slot>
    </div>
  </label>
</template>
