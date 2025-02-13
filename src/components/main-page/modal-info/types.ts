export interface IModalInfoProps {
  title: string;
  buttonName: string;
  modelValue: boolean;
}

export interface IModalInfoEmits {
  (e: 'button-click'): void;
}

export interface IModalInfoSlots {
  default(): any;
}
