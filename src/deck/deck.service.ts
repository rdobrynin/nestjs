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
  CardSuiteHierarchyEnum,
  DeckType,
} from '../constants';
import * as _ from 'lodash';
import { DeckNotFoundException } from './exceptions/deck-not-found.exception';
import { DrawCardDto } from './dto/draw-card.dto';
import { ExceedLimitCardsException } from './exceptions/exceed-limit-cards.exception';
import { CardDtos } from './dto/card.dtos';
import { CardDto } from './dto/card.dto';
import { Repository } from 'typeorm';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(DeckEntity)
    private deckEntityRepository: Repository<DeckEntity>,
  ) {}

  async createDeck(createDeckDto: CreateDeckDto): Promise<DeckDto> {
    const cards: Card[] = this.populateDeck(createDeckDto);

    const deckEntity: DeckEntity = plainToClass(DeckEntity, {
      type: createDeckDto.type,
      cards: cards,
      isShuffled: createDeckDto.shuffled,
    });

    await this.deckEntityRepository.save(deckEntity);

    return deckEntity.toDto();
  }

  async getById(id: string): Promise<DeckDto> {
    const deckEntity: DeckEntity = await this.deckEntityRepository.findOneBy({
      id: id,
    });

    if (!deckEntity) {
      throw new DeckNotFoundException();
    }

    return deckEntity.toDto();
  }

  async drawCard(drawCardDto: DrawCardDto): Promise<CardDtos> {
    const deckEntity: DeckEntity = await this.deckEntityRepository.findOneBy({
      id: drawCardDto.deckId,
    });

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

    await this.deckEntityRepository.save(deckEntity);
    await this.deckEntityRepository
      .createQueryBuilder()
      .update()
      .set({ cards: cards })
      .where('id = :deckId', {
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
        rank < CardRankHierarchyEnum._6 &&
        createDeckDto.type != DeckType.FULL
      ) {
        continue;
      }
      for (const suit in CardSuiteHierarchyEnum) {
        cards.push({ rank: rank, suit: suit as CardSuiteHierarchyEnum });
      }
    }

    if (createDeckDto.shuffled) {
      cards = _.shuffle(cards);
    }

    return cards;
  }
}
