<template>
  <div :class="['card', { 'card--active': active }]">
    <div class="card__front">
      <v-icon v-if="icon" :name="`cards/${icon}`" :size="isMobile ? 48 : 64" />
    </div>
    <div class="card__back" />
  </div>
</template>

<script lang="ts" setup>
import { VIcon } from '@components/ui';
import { useScreenSize } from '@/composables';

import { defaultProps, ICardProps } from './types';

withDefaults(defineProps<ICardProps>(), defaultProps);
const { isMobile } = useScreenSize();
</script>

<style lang="scss" scoped src="./v-card.scss" />
