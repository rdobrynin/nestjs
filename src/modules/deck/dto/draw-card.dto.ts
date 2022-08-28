import { IsNumber, IsPositive, IsString } from "class-validator";

export class DrawCardDto {
  @IsString()
  deckId: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
