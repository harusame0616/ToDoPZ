<script setup lang="ts">
type Props = { isOpen: boolean };

const props = defineProps<Props>();

const curtenShowStyle = computed(() =>
  props.isOpen ? 'bg-black/30' : 'bg-black/0 pointer-events-none'
);

const showStyle = computed(() =>
  props.isOpen ? 'max-h-full max-w-full p-4' : 'p-0 max-h-0 max-w-0 border-none'
);
</script>

<template>
  <div
    class="
      fixed
      w-full
      h-full
      flex
      justify-center
      items-center
      transition-all
      duration-300
    "
    :class="curtenShowStyle"
  >
    <div
      class="
        transition-all
        duration-500
        overflow-y-hidden
        shadow-md
        rounded-md
        bg-white
        border border-gray-300
        overflow-hidden
      "
      :class="showStyle"
    >
      <slot></slot>
    </div>
  </div>
</template>
