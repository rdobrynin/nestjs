import { ApiProperty } from '@nestjs/swagger';
import { DeckSize, DeckType } from "../../constants";
import { AbstractDto } from '../../common/dto';
import { IDeck } from '../interfaces/IDeck';
import { Card } from '../card';

export class DeckDto extends AbstractDto {
  @ApiProperty()
  deckId: string;

  @ApiProperty({ type: 'enum', enum: DeckType })
  type: DeckType;

  @ApiProperty({ type: Boolean })
  shuffled: boolean;

  @ApiProperty({ type: Boolean })
  cards: Card[];

  @ApiProperty({ type: Number })
  remaining: number;

  constructor(entity: IDeck) {
    super(entity);
    this.deckId = entity.id;
    this.type = entity.type;
    this.shuffled = entity.isShuffled;
    this.cards = entity.cards;
    this.remaining = DeckType.SHORT
      ? Number(DeckSize.SHORT) - entity.cards.length
      : Number(DeckSize.FULL) - entity.cards.length;
  }
}
