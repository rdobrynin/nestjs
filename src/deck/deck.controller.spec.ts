import { Test, TestingModule } from '@nestjs/testing';
import { DeckController } from './deck.controller';
import { DeckService } from './deck.service';

describe('CardDeckController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [DeckController],
      providers: [DeckService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      // const appController = app.get<DeckController>(DeckController);
      // expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
