import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DeckController } from '../src/deck/deck.controller';
import { DeckService } from '../src/deck/deck.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeckEntity } from '../src/deck/deck.entity';
import { DeckType } from '../src/constants';
import { DeckModule } from '../src/deck/deck.module';

describe('DeckController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DeckModule],
    })
      .overrideProvider(DeckService)
      .useValue(DeckService)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Test invalid request data for endpoints', async () => {
    await request(app.getHttpServer())
      .post('/api/deck')
      .send({ type: 'invalid value', shuffled: true })
      .expect(404);

    await request(app.getHttpServer()).get(`/api/deck/invalidUuid`).expect(404);

    await request(app.getHttpServer())
      .post('/api/deck/draw')
      .send({ deckId: 'wrong-uid', amount: 2 })
      .expect(404);
  });

  it('Test valid request data for endpoints', async () => {
    await request(app.getHttpServer())
      .post('/api/deck')
      .send({ type: DeckType.FULL, shuffled: true })
      .expect(201);

    await request(app.getHttpServer())
      .get(`/api/deck/549b4b17-467c-415c-93fa-a33586424bd5`)
      .expect(200);

    await request(app.getHttpServer()).post('/api/deck/draw').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
