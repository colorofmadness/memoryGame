<template>
  <game-loader v-if="loading" />
  <div class="screen">
    <div class="game">
      <div class="content">
        <div class="phone" />
        <top-bar
          :pairs="remainingPairs"
          :time="time"
          @restart="restartGame"
          @change-pairs="changeDifficulty"
        />

        <game-board
          :card-list="cardList"
          :difficult="difficult"
          :loading="loading"
          @card-click="flipCard"
        />

        <bottom-bar :turns="turns" />
      </div>
    </div>

    <modal-info
      v-model="isOpen"
      button-name="Ещё раз!"
      title="Вы победили!"
      @button-click="startGame"
    >
      Ходов: {{ turns }}<br />
      Время: {{ time }}
    </modal-info>

    <modal-info
      v-model="isNewGameModalOpen"
      button-name="Старт!"
      class="start-modal"
      title="Игра на память"
      @button-click="startNewGame"
    >
      Необходимо найти пары карточек

      <div class="difficulties">
        <v-button
          v-for="(diff, key) of difficulties"
          :key="key"
          :active="difficult === diff"
          @click="changeDifficulty(key)"
        >
          {{ diff }}
        </v-button>
      </div>
    </modal-info>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import deck, { difficulties, TDifficulty } from '@pages/main-page/const';
import { useIsOpen, useTime } from '@/composables';
import createDeck from '@/composables/useCreateDesk';
import TopBar from '@components/main-page/top-bar';
import BottomBar from '@components/main-page/bottom-bar';
import GameBoard from '@components/main-page/game-board/game-board.vue';
import ModalInfo from '@components/main-page/modal-info';
import { VButton } from '@components/ui';
import GameLoader from '@components/main-page/game-loader';

import { ICard } from '@/types';

import shuffle from '@/helpers/shuffle';

const cardList = ref<ICard[]>([]);
const userCanFlipCard = ref<boolean>(true);
const userSelection = ref<ICard[]>([]);
const gameStarts = ref<boolean>(false);
const loading = ref<boolean>(false);
const turns = ref<number>(0);
const difficult = ref<number>(6);

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
  cardList.value = shuffle([...cardList.value]);
  cardList.value = cardList.value.map((card: ICard, index: number) => {
    return {
      ...card,
      matched: false,
      position: index,
      active: false
    };
  });
};

const createGameDeck = () => {
  const shuffleDeck = shuffle([...deck]).slice(0, difficult.value);
  cardList.value = createDeck(shuffleDeck);
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
  if (loading.value) {
    return;
  }

  if (gameStarts.value) {
    restartGame();
  } else {
    closeNewGameModal();
    startGame();
  }
};

const changeDifficulty = (difficulty: TDifficulty = 'easy') => {
  if (gameStarts.value) {
    pauseTime();
    gameStarts.value = false;
    openNewGameModal();
  } else {
    loading.value = true;

    difficult.value = difficulties[difficulty];
    createGameDeck();

    setTimeout(() => {
      loading.value = false;
    }, 3500);
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
  createGameDeck();
});

onMounted(() => {
  openNewGameModal();
});
</script>

<style lang="scss" scoped src="./main-page.scss" />
