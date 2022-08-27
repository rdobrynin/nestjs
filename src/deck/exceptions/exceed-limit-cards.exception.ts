import { BadRequestException } from '@nestjs/common';

export class ExceedLimitCardsException extends BadRequestException {
  constructor() {
    super('error.exceedLimitCards');
  }
}
