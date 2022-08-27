import { Injectable } from '@nestjs/common';
import { DeckDto } from './dto/deck.dto';
import { Deck } from './deck.entity';

@Injectable()
export class DeckService {
  async createCardDeck(): Promise<DeckDto> {
    return new DeckDto(new Deck());
  }
}
