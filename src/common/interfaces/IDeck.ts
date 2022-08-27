import { DeckType } from '../../constants';
import { IAbstractEntity } from '../entities';
import { DeckDto } from '../../deck/dto/deck.dto';

export interface IDeck extends IAbstractEntity<DeckDto> {
  type: DeckType;
  isShuffled: boolean;
}
