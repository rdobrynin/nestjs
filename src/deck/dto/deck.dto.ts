import { ApiProperty } from '@nestjs/swagger';
import { DeckType } from '../../constants';
import { AbstractDto } from '../../common/dto';
import { IDeck } from '../interfaces/IDeck';
import { Card } from '../card';
import { CardDto } from './card.dto';
import * as _ from 'lodash';

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
    this.cards = _.map(entity.cards, CardDto.toDto);
    this.remaining = entity.cards.length;
  }
}
