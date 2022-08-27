import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../common/entities';
import { DeckType } from '../constants';
import { UseDto } from '../common/decorators';
import { DeckDto } from './dto/deck.dto';
import { IDeck } from '../common/interfaces/IDeck';

@Entity({ name: 'decks' })
@UseDto(DeckDto)
export class Deck extends AbstractEntity<DeckDto> implements IDeck {
  @Column({
    type: 'enum',
    enum: DeckType,
    default: DeckType.FULL,
  })
  type: DeckType;

  @Column({ default: false })
  isShuffled: boolean;
}
