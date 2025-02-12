<template>
  <button :class="['btn', { 'btn--disabled': disabled }]" :disabled="disabled" :type="type">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { defaultProps, IButtonProps } from './types';

withDefaults(defineProps<IButtonProps>(), defaultProps);
</script>

<style lang="scss" scoped src="./v-button.scss" />
