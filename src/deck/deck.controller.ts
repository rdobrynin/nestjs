import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { DeckService } from './deck.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DeckDto } from './dto/deck.dto';
import { CreateDeckDto } from './dto/create-deck.dto';
import { DrawCardDto } from './dto/draw-card.dto';
import { CardDtos } from './dto/card.dtos';
@Controller('deck')
@ApiTags('Deck')
export class DeckController {
  constructor(private readonly cardDeckService: DeckService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: DeckDto,
    description: 'Create new deck',
  })
  async createDeck(@Body() createDeckDto: CreateDeckDto): Promise<DeckDto> {
    return this.cardDeckService.createDeck(createDeckDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DeckDto,
    description: 'Get deck by ID',
  })
  async getById(@Param('uid') id: string): Promise<DeckDto> {
    return this.cardDeckService.getById(id);
  }

  @Post('draw')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CardDtos,
    description: 'Draw card(s)',
  })
  async drawCard(@Body() drawCardDto: DrawCardDto): Promise<CardDtos> {
    return this.cardDeckService.drawCard(drawCardDto);
  }
}
