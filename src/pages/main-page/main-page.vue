<template>
  <div class="screen">
    <div class="game">
      <div class="content">
        <div class="phone" />
        <div class="top-bar">
          <div class="top-bar__time">
            <v-icon name="main/time" size="32" />
            {{ time }}
          </div>
          <div class="top-bar__plane"></div>
          <div class="top-bar__pairs">
            {{ remainingPairs }}
            <v-icon name="main/pairs" size="32" />
          </div>
        </div>
        <transition-group class="grid" name="shuffle-cards" tag="section">
          <v-card
            v-for="card of cardList"
            :key="`${card.value}-${card.variant}`"
            :active="card.active"
            :icon="card.value"
            @click="flipCard(card)"
          />
        </transition-group>
        <div class="turns">
          <p>Сделано ходов:</p>
          <span>{{ turns }}</span>
        </div>
      </div>
    </div>

    <transition name="fade">
      <v-modal v-if="isOpen">
        <div class="info">
          <div class="info__title">Вы победили!</div>
          <div class="info__score">Ходов: {{ turns }} <br />Время: {{ time }}</div>
          <v-button class="repeat" @click="startGame">Ещё раз!</v-button>
        </div>
      </v-modal>
    </transition>

    <transition name="fade">
      <v-modal v-if="isNewGameModalOpen" class="start-modal">
        <div class="info">
          <div class="info__title">Игра на память</div>
          <div class="info__description">Необходимо найти пары карточек</div>
          <v-button class="repeat" @click="startNewGame">Старт!</v-button>
        </div>
      </v-modal>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import VCard from '@components/main-page/card';
import { VButton, VIcon } from '@components/ui';
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import deck from '@pages/main-page/const';
import { useIsOpen, useTime } from '@/composables';
import createDeck from '@/composables/useCreateDesk';
import VModal from '@components/ui/v-modal/v-modal.vue';

import { ICard } from '@/types';

import shuffle from '@/helpers/shuffle';

const cardList = ref<ICard[]>([]);
const userCanFlipCard = ref<boolean>(true);
const userSelection = ref<ICard[]>([]);
const gameStarts = ref<boolean>(false);
const turns = ref<number>(0);
const { isOpen, openModal, closeModal } = useIsOpen();
const {
  isOpen: isNewGameModalOpen,
  openModal: openNewGameModal,
  closeModal: closeNewGameModal
} = useIsOpen();

const { time, resumeTime, pauseTime, resetTime } = useTime();

const increaseTurn = () => {
  turns.value++;
};

const shuffleCards = () => {
  cardList.value = shuffle(cardList.value);
};

const restartGame = () => {
  if (isOpen) {
    closeModal();
  }
  turns.value = 0;
  resetTime();
  resumeTime();

  shuffleCards();

  cardList.value = cardList.value.map((card: ICard, index: number) => {
    return {
      ...card,
      matched: false,
      position: index,
      active: false
    };
  });
};

const startGame = () => {
  gameStarts.value = true;
  restartGame();
};

const startNewGame = () => {
  if (gameStarts.value) {
    restartGame();
  } else {
    closeNewGameModal();
    startGame();
  }
};

const flipCard = (payload: ICard) => {
  if (payload.matched) return;

  if (userCanFlipCard.value && gameStarts.value) {
    cardList.value[payload.position].active = true;

    if (userSelection.value[0]) {
      if (
        userSelection.value[0].position === payload.position &&
        userSelection.value[0].value === payload.value
      ) {
        return;
      }
      userSelection.value[1] = payload;
    } else {
      userSelection.value[0] = payload;
      increaseTurn();
    }
  }
};

const remainingPairs = computed(() => {
  const remainingCards = cardList.value.filter((card: ICard) => !card.matched).length;

  return remainingCards / 2;
});

watch(remainingPairs, (currentValue: number) => {
  if (currentValue === 0) {
    pauseTime();
    openModal();
    gameStarts.value = false;
  }
});

watch(
  userSelection,
  (currentValue: ICard[]) => {
    if (currentValue.length === 2) {
      const [cardOne, cardTwo] = currentValue;
      userCanFlipCard.value = false;

      if (cardOne.value === cardTwo.value) {
        cardList.value[cardOne.position].matched = true;
        cardList.value[cardTwo.position].matched = true;
        userCanFlipCard.value = true;
      } else {
        setTimeout(() => {
          cardList.value[cardOne.position].active = false;
          cardList.value[cardTwo.position].active = false;
          userCanFlipCard.value = true;
        }, 800);
      }

      userSelection.value.length = 0;
    }
  },
  { deep: true }
);

onBeforeMount(() => {
  cardList.value = createDeck(deck);
});
onMounted(() => {
  openNewGameModal();
});
</script>

<style lang="scss" scoped src="./main-page.scss" />
