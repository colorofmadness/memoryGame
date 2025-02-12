import { computed, ref } from 'vue';
import { useInterval } from '@vueuse/core';

const useTime = () => {
  const seconds = ref<number>(0);
  const minutes = ref<number>(0);
  const hours = ref<number>(0);

  const updateTimer = () => {
    seconds.value++;

    if (minutes.value === 60) {
      minutes.value = 0;
      hours.value++;
    }

    if (seconds.value === 60) {
      seconds.value = 0;
      minutes.value++;
    }
  };

  const { reset, pause, resume } = useInterval(1000, {
    controls: true,
    immediate: false,
    callback: () => updateTimer()
  });

  const resetTime = () => {
    seconds.value = 0;
    minutes.value = 0;
    hours.value = 0;
    reset();
  };

  const formattedTime = computed<string>(() => {
    const formattedHours = hours.value ? String(hours.value).padStart(2, '0') : null;
    const formattedMinutes = String(minutes.value).padStart(2, '0');
    const formattedSeconds = String(seconds.value).padStart(2, '0');

    return [formattedHours, formattedMinutes, formattedSeconds].filter((item) => item).join(':');
  });

  return {
    seconds,
    minutes,
    time: formattedTime,
    resetTime,
    resumeTime: resume,
    pauseTime: pause
  };
};

export default useTime;
