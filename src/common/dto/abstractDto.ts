import { ApiProperty } from '@nestjs/swagger';

import type { IAbstractEntity } from '../entities';

export class AbstractDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(entity: IAbstractEntity<AbstractDto>) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
