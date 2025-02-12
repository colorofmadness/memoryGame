<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { onBeforeMount } from 'vue';
import { useEventListener } from '@vueuse/core';

const calcApx = () => {
  const apx = window.innerWidth / 1920;

  document.body.style.setProperty('--apx', `${apx}px`);
};

useEventListener(window, 'resize', calcApx, {
  capture: true
});

onBeforeMount(() => {
  calcApx();
});
</script>
