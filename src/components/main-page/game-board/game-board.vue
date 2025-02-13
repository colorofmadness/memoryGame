<template>
  <transition name="fade">
    <div v-if="loading" class="game-board">
      <v-card />
    </div>
    <transition-group
      v-else
      :class="['game-board', `game-board--grid-${difficult}`]"
      name="shuffle-cards"
      tag="section"
    >
      <v-card
        v-for="card of cardList"
        :key="getKey(card)"
        :active="card.active"
        :icon="card.value"
        @click="emit('cardClick', card)"
      />
    </transition-group>
  </transition>
</template>

<script lang="ts" setup>
import VCard from '@components/main-page/card';

import {
  defaultProps,
  IGameBoardEmits,
  IGameBoardProps
} from '@components/main-page/game-board/types';
import { ICard } from '@/types';

withDefaults(defineProps<IGameBoardProps>(), defaultProps);
const emit = defineEmits<IGameBoardEmits>();

const getKey = ({ value, variant, id }: ICard) => {
  return `${value}-${variant}-${id}`;
};
</script>

<style lang="scss" scoped src="./game-board.scss" />
