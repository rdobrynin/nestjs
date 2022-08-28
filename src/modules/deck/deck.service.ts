import { Injectable } from '@nestjs/common';
import { DeckDto } from './dto/deck.dto';
import { DeckEntity } from './deck.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeckDto } from './dto/create-deck.dto';
import { Card } from './card';
import { plainToClass } from 'class-transformer';
import {
  CardRank,
  CardRankHierarchyEnum,
  CardSuiteEnum,
  DeckType,
} from './constants';
import * as _ from 'lodash';
import { DeckNotFoundException } from './exceptions/deck-not-found.exception';
import { DrawCardDto } from './dto/draw-card.dto';
import { ExceedLimitCardsException } from './exceptions/exceed-limit-cards.exception';
import { CardDtos } from './dto/card.dtos';
import { CardDto } from './dto/card.dto';
import { Repository } from "typeorm";

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(DeckEntity)
    private deckRepository: Repository<DeckEntity>,
  ) {}

  async createDeck(createDeckDto: CreateDeckDto): Promise<DeckDto> {
    const cards: Card[] = this.populateDeck(createDeckDto);

    const deckEntity: DeckEntity = plainToClass(DeckEntity, {
      type: createDeckDto.type,
      cards: cards,
      isShuffled: createDeckDto.shuffled,
    });

    await this.deckRepository.save(deckEntity);

    return DeckDto.toDto(deckEntity);
  }

  async getById(id: string): Promise<DeckDto> {
    const deckEntity = await this.deckRepository.findOneOrFail(id);

    if (!deckEntity) {
      throw new DeckNotFoundException();
    }

    return DeckDto.toDto(deckEntity);
  }

  async drawCard(drawCardDto: DrawCardDto): Promise<CardDtos> {
    const deckEntity = await this.deckRepository.findOneOrFail(drawCardDto.deckId)

    if (!deckEntity) {
      throw new DeckNotFoundException();
    }

    if (drawCardDto.amount > deckEntity.cards.length) {
      throw new ExceedLimitCardsException();
    }

    const cards = deckEntity.cards.slice(
      drawCardDto.amount,
      deckEntity.cards.length,
    );

    await this.deckRepository.save(deckEntity);
    await this.deckRepository
      .createQueryBuilder()
      .update()
      .set({ cards: cards })
      .where('deckId = :deckId', {
        deckId: drawCardDto.deckId,
      })
      .execute();

    return plainToClass(CardDtos, {
      cards: _.map(cards, CardDto.toDto),
    });
  }

  public populateDeck(createDeckDto: CreateDeckDto): Card[] {
    let cards: Card[] = [];

    for (const rank of CardRank) {
      if (
        rank < CardRankHierarchyEnum._7 &&
        createDeckDto.type != DeckType.FULL
      ) {
        continue;
      }
      for (const suit in CardSuiteEnum) {
        cards.push({ rank: rank, suit: suit as CardSuiteEnum });
      }
    }

    if (createDeckDto.shuffled) {
      cards = _.shuffle(cards);
    }

    return cards;
  }
}
