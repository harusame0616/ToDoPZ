<script setup lang="ts">
type Props = {
  color?: string;
  backgroundColor?: string;
};

const prop = withDefaults(defineProps<Props>(), {
  backgroundColor: 'none',
  color: 'black',
});

const backgroundStyle = computed(() => {
  return `background-color: ${prop.backgroundColor};`;
});
const textColorStyle = computed(() => {
  return `color: ${prop.color};`;
});
</script>

<template>
  <div :style="[backgroundStyle, textColorStyle]" class="rounded-md py-2 px-4">
    <slot></slot>
  </div>
</template>
