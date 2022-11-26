import { ConflictException, HttpException } from '@nestjs/common';

export class ConflictError extends ConflictException {
  constructor(message: string) {
    super(message);
  }
}
