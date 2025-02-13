const deck = [
  'wolf',
  'spider',
  'shark',
  'mouse',
  'crown',
  'cat',
  'brain',
  'caracula',
  'diamond',
  'dice',
  'letter',
  'hearth',
  'puzzle',
  'star',
  'sword',
  'bill'
];

export type TDifficulty = 'easy' | 'normal' | 'hard' | 'extreme';

export const difficulties: Record<TDifficulty, number> = {
  easy: 6,
  normal: 8,
  hard: 12,
  extreme: 16
};

export default deck;
