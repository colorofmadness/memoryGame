<template>
  <div :class="['card', { 'card--active': active }]">
    <div class="card__front">
      <v-icon :name="`cards/${icon}`" size="92" />
    </div>
    <div class="card__back" />
  </div>
</template>

<script lang="ts" setup>
import { VIcon } from '@components/ui';

import { defaultProps, ICardProps } from './types';

withDefaults(defineProps<ICardProps>(), defaultProps);
</script>

<style lang="scss" scoped src="./v-card.scss" />
