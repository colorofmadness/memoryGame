<template>
  <div class="bottom-bar">
    <p>Сделано ходов:</p>
    <span>{{ turns }}</span>
  </div>
</template>

<script lang="ts" setup>
import { IBottomBarProps } from './types';

defineProps<IBottomBarProps>();
</script>

<style lang="scss" scoped src="./bottom-bar.scss" />
