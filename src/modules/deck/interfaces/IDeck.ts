import { DeckType } from '../constants';
import { Card } from '../card';

export interface IDeck {
  deckId: string;
  type: DeckType;
  shuffled: boolean;
  cards: Card[];
}
