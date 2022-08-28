import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { DeckType } from '../constants';
import { IDeck } from './interfaces/IDeck';
import { Card } from './card';

@Entity({ name: 'decks' })
export class DeckEntity implements IDeck {
  @PrimaryGeneratedColumn('uuid')
  deckId: string;

  @Column({
    type: 'enum',
    enum: DeckType,
    default: DeckType.FULL,
  })
  type: DeckType;

  @Column({ type: 'json' })
  cards: Card[];

  @Column({ default: false })
  shuffled: boolean;
}
