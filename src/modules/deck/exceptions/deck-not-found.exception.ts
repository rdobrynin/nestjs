import { BadRequestException } from '@nestjs/common';

export class DeckNotFoundException extends BadRequestException {
  constructor() {
    super('error.deckNotFound');
  }
}
