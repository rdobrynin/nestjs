import { CardDto } from './card.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CardDtos {
  @ApiProperty({ type: CardDto, isArray: true })
  cards: CardDto[];
}
