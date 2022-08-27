import { DeckType } from '../../constants';
import { IsBoolean, IsEnum, IsNotEmpty } from "class-validator";

export class CreateDeckDto {
  @IsNotEmpty()
  @IsEnum(DeckType)
  type: DeckType;

  @IsNotEmpty()
  @IsBoolean()
  shuffled: boolean;
}
