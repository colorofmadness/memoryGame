import { ref } from 'vue';

const useIsOpen = (initialState: boolean = false) => {
  const showModalState = ref<boolean>(initialState);

  const openModal = () => {
    showModalState.value = true;
  };

  const closeModal = () => {
    showModalState.value = false;
  };

  const toggle = () => {
    showModalState.value = !showModalState.value;
  };

  return {
    isOpen: showModalState,
    openModal,
    closeModal,
    toggle
  };
};

export default useIsOpen;
