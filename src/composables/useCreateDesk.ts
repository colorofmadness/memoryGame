import { ICard } from '@/types';

type ICardRaw = Omit<ICard, 'position'> & { position: number | null };

const createDeck = (deckData: string[]): ICard[] => {
  const list: ICardRaw[] = [];

  deckData.forEach((item, index) => {
    list.push({
      matched: false,
      value: item,
      variant: 1,
      active: false,
      position: null
    });

    list.push({
      matched: false,
      variant: 2,
      value: item,
      active: false,
      position: index
    });
  });

  return list.map((card, index) => ({
    ...card,
    position: index
  }));
};

export default createDeck;
