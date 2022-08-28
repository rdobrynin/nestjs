import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DeckModule } from "./modules/deck/deck.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiConfigService } from "./api-config.service";

@Module({
  imports: [
    DeckModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: (
        configService: ApiConfigService,
      ) => ({
        ...configService.typeOrmConfig,
      }),
      inject: [],
    }),
  ],
})
export class AppModule {}
