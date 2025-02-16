<template>
  <div class="top-bar">
    <div class="top-bar__time">
      <v-icon name="main/time" size="32" />
      {{ time }}
    </div>
    <div class="top-bar__plane"></div>
    <div class="top-bar__pairs">
      {{ pairs }}
      <v-icon name="main/pairs" size="32" @click="emit('change-pairs')" />
      <v-icon name="main/restart" size="28" @click="emit('restart')" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VIcon } from '@components/ui';

import { ITopBarEmits, ITopBarProps } from './types';

defineProps<ITopBarProps>();
const emit = defineEmits<ITopBarEmits>();
</script>

<style lang="scss" scoped src="./top-bar.scss" />
