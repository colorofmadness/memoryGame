<template>
  <svg
    :height="height ?? size"
    :style="styles"
    :width="width ?? size"
    aria-hidden="true"
    class="icon"
  >
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';

import IIconProps from './types';

const props = withDefaults(defineProps<IIconProps>(), {
  size: 24
});

const icon = ref('');

const styles = computed(() => ({
  minWidth: `${props.width ?? props.size}px`,
  minHeight: `${props.height ?? props.size}px`
}));

async function getIcon() {
  try {
    const iconsImport: Record<string, any> = import.meta.glob('@/assets/icons/**/**.svg');

    const rawIcon = await iconsImport[`/src/assets/icons/${props.name}.svg`]();

    icon.value = rawIcon.default;
  } catch {
    console.error(`Icon '${props.name}' doesn't exist in 'assets/icons'`);
  }
}

watchEffect(getIcon);
</script>

<style lang="scss" scoped src="./v-icon.scss" />
