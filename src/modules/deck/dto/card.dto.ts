import { Card } from '../card';
import { ApiProperty } from '@nestjs/swagger';

export class CardDto {
  @ApiProperty({ type: String })
  value: string;

  @ApiProperty({ type: String })
  suit: string;

  @ApiProperty({ type: String })
  code: string;

  public static toDto(card: Card): CardDto {
    return {
      value: card.rank as string,
      suit: card.suit as string,
      code: `${String(card.rank)[0]}${String(card.suit[0])}`,
    };
  }
}
