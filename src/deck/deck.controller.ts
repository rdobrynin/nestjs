import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { DeckService } from './deck.service';
import { ApiTags } from '@nestjs/swagger';
import { DeckDto } from './dto/deck.dto';

@Controller('deck')
@ApiTags('Deck')
export class DeckController {
  constructor(private readonly cardDeckService: DeckService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCardDeck(): Promise<DeckDto> {
    return this.cardDeckService.createCardDeck();
  }
}
