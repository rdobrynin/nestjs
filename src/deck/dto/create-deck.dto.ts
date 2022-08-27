import { DeckType } from '../../constants';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeckDto {
  @IsNotEmpty()
  @IsEnum(DeckType)
  @ApiProperty({ enum: DeckType })
  type: DeckType;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ type: Boolean })
  shuffled: boolean;
}
