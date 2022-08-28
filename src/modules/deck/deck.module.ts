import { Module } from '@nestjs/common';
import { DeckController } from './deck.controller';
import { DeckService } from './deck.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from "./deck.entity";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([DeckEntity]),
  ],
  controllers: [DeckController],
  providers: [DeckService],
})
export class DeckModule {}
