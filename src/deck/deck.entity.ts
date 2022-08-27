import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../common/entities';
import { DeckType } from '../constants';
import { UseDto } from '../common/decorators';
import { DeckDto } from './dto/deck.dto';
import { IDeck } from './interfaces/IDeck';
import { Card } from './card';

@Entity({ name: 'decks' })
@UseDto(DeckDto)
export class DeckEntity extends AbstractEntity<DeckDto> implements IDeck {
  @Column({
    type: 'enum',
    enum: DeckType,
    default: DeckType.FULL,
  })
  type: DeckType;

  @Column({ type: 'json' })
  cards: Card[];

  @Column({ default: false })
  isShuffled: boolean;
}
