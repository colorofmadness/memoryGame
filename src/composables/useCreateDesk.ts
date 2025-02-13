import { ICard } from '@/types';

type ICardRaw = Omit<ICard, 'position'> & { position: number | null };

const createDeck = (deckData: string[]): ICard[] => {
  const list: ICardRaw[] = [];

  deckData.forEach((item, index) => {
    const id = Date.now();
    
    list.push({
      matched: false,
      value: item,
      variant: 1,
      active: false,
      position: null,
      id
    });

    list.push({
      matched: false,
      variant: 2,
      value: item,
      active: false,
      position: index,
      id
    });
  });

  return list.map((card, index) => ({
    ...card,
    position: index
  }));
};

export default createDeck;
