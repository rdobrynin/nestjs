import { ApiProperty } from '@nestjs/swagger';
import { DeckType } from '../../constants';
import { AbstractDto } from '../../common/dto';
import { IDeck } from '../../common/interfaces/IDeck';

export class DeckDto extends AbstractDto {
  @ApiProperty({ type: 'enum', enum: DeckType })
  type: DeckType;

  @ApiProperty({ type: Boolean })
  isShuffled: boolean;

  constructor(entity: IDeck) {
    super(entity);
    this.type = entity.type;
    this.isShuffled = entity.isShuffled;
  }
}
