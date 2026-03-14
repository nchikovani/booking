import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@repo/prisma';

export const PRISMA = Symbol('PRISMA');

@Global()
@Module({
  providers: [
    {
      provide: PRISMA,
      useFactory: () => {
        return new PrismaClient();
      },
    },
  ],
  exports: [PRISMA],
})
export class PrismaModule {}
