<template>
  <div class="top-bar">
    <div class="top-bar__time">
      <v-icon name="main/time" size="32" />
      {{ time }}
    </div>
    <div class="top-bar__plane"></div>
    <div class="top-bar__pairs">
      {{ pairs }}
      <v-icon name="main/pairs" size="32" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VIcon } from '@components/ui';

import { ITopBarProps } from './types';

defineProps<ITopBarProps>();
</script>

<style lang="scss" scoped src="./top-bar.scss" />
