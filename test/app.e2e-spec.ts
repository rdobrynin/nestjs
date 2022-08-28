import { Test, TestingModule } from '@nestjs/testing';
import { DeckService } from '../src/deck/deck.service';
import { DeckType } from '../src/constants';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeckEntity } from '../src/deck/deck.entity';
import * as sinon from 'sinon';
import { Repository } from 'typeorm';
import { DrawCardDto } from '../src/deck/dto/draw-card.dto';

describe('Testing app.service', () => {
  let module: TestingModule;
  let service: DeckService;

  class SpyRepo {
    save(deckEntity: DeckEntity) {
      return deckEntity;  
    }
    findOneBy(deckEntity: DeckEntity) {
      return deckEntity;
    }
  }

  const mockProviders = [
    {
      provide: getRepositoryToken(DeckEntity),
      useClass: SpyRepo,
      useValue: sinon.createStubInstance(Repository),
    },
  ];

  const sandbox = sinon.createSandbox();
  beforeAll(async () => {
    // build up testing module
    module = await Test.createTestingModule({
      imports: [],
      providers: [...mockProviders, DeckService],
    })
      .compile()
      .catch((err) => {
        console.error(err);
        throw err;
      });

    service = module.get<DeckService>(DeckService);
  });

  it('Should be defined POST createDeck  and called with', async () => {
    const createDeskSpy = jest.spyOn(service, 'createDeck');
    await service.createDeck({
      type: DeckType.FULL,
      shuffled: true,
    });
    expect(createDeskSpy).toHaveBeenCalledWith({
      type: DeckType.FULL,
      shuffled: true,
    });
  });

  it('Should be defined GET getById and called with', async () => {
    const getByIdSpy = jest.spyOn(service, 'getById');
    const deskId = '549b4b17-467c-415c-93fa-a33586424bd5';
    await service.getById(deskId);
    expect(getByIdSpy).toHaveBeenCalledWith(deskId);
  });

  it('Should be defined POST drawCard and called with', async () => {
    const getByIdSpy = jest.spyOn(service, 'drawCard');
    const drawCard: DrawCardDto = {
      deckId: '549b4b17-467c-415c-93fa-a33586424bd5',
      amount: 2,
    };
    await service.drawCard(drawCard);
    expect(getByIdSpy).toHaveBeenCalledWith(drawCard);
  });

  afterAll(async () => {
    sandbox.restore();
  });
});
