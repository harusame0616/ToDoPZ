import { BadRequestException } from '@nestjs/common';

export class ParameterError extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
