import { ApiHideProperty } from '@nestjs/swagger';

import type { IAbstractEntity } from '../entities';

export class AbstractDto {
  @ApiHideProperty()
  createdAt: Date;

  @ApiHideProperty()
  updatedAt: Date;

  constructor(entity: IAbstractEntity<AbstractDto>) {
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
