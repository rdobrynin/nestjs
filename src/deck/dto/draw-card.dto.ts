import { IsPositive } from 'class-validator';
import { IsNumber, IsString } from 'nestjs-swagger-dto';

export class DrawCardDto {
  @IsString()
  deckId: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
