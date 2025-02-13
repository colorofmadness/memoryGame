import { ICard } from '@/types';

export interface IGameBoardProps {
  cardList: ICard[];
  difficult?: number;
  loading?: boolean;
}

export interface IGameBoardEmits {
  (e: 'cardClick', payload: ICard): void;
}

export const defaultProps = {
  difficult: 6,
  loading: false
};
