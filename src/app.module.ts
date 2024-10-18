import { Module } from '@nestjs/common';
import { ChangeModule } from './change/change.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { FloatModule } from './float/float.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), 

  ThrottlerModule.forRoot([{
    ttl: 60000,
    limit: 5,
  }]),
  
  
  HttpModule, ChangeModule, DatabaseModule, FloatModule ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule {}
