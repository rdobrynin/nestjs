import { DeckType } from '../../constants';
import { IAbstractEntity } from '../../common/entities';
import { DeckDto } from '../dto/deck.dto';
import { Card } from '../card';

export interface IDeck extends IAbstractEntity<DeckDto> {
  type: DeckType;
  isShuffled: boolean;
  cards: Card[];
}
