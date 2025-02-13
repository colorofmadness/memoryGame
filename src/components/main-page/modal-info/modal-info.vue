<template>
  <transition name="fade">
    <v-modal v-if="model" v-bind="$attrs">
      <div class="info">
        <div class="info__title">
          {{ title }}
        </div>
        <div class="info__description">
          <slot />
        </div>
        <v-button class="repeat" @click="emit('button-click')">
          {{ buttonName }}
        </v-button>
      </div>
    </v-modal>
  </transition>
</template>

<script lang="ts" setup>
import { VButton, VModal } from '@components/ui';

import { IModalInfoEmits, IModalInfoProps, IModalInfoSlots } from './types';

defineOptions({
  inheritAttrs: false
});

defineProps<IModalInfoProps>();
defineSlots<IModalInfoSlots>();
const emit = defineEmits<IModalInfoEmits>();
const model = defineModel<boolean>();
</script>

<style lang="scss" scoped src="./modal-info.scss" />
