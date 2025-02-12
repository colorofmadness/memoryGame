import { useBreakpoints } from '@vueuse/core';
import { computed, ComputedRef } from 'vue';

export type TResolutions = 'mobile' | 'desktop' | 'tablet' | 'laptop';
const breakpoints: Record<TResolutions, number> = {
  mobile: 0,
  tablet: 768,
  laptop: 1080,
  desktop: 1280
};
export const useScreenSize = () => {
  const screenSize = useBreakpoints<TResolutions>(breakpoints);

  const activeBreakpoint: ComputedRef<TResolutions> =
    screenSize.active() as ComputedRef<TResolutions>;

  const isMobile = computed(() => activeBreakpoint.value === 'mobile');

  return {
    activeBreakpoint,
    isMobile
  };
};
