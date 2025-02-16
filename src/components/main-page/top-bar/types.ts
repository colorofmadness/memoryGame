export interface ITopBarProps {
  time: string;
  pairs: number;
}

export interface ITopBarEmits {
  (e: 'restart'): void;

  (e: 'change-pairs'): void;
}
