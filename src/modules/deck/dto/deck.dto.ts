import { ApiProperty } from '@nestjs/swagger';
import { DeckType } from '../constants';
import { IDeck } from '../interfaces/IDeck';
import { Card } from '../card';
import { CardDto } from './card.dto';
import * as _ from 'lodash';

export class DeckDto {
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

  public static toDto(entity: IDeck): DeckDto {
    return {
      deckId: entity.deckId,
      type: entity.type,
      shuffled: entity.shuffled,
      cards: _.map(entity.cards, CardDto.toDto),
      remaining: entity.cards.length ?? 0,
    };
  }
}
