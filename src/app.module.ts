import { Module } from '@nestjs/common';
import { ChangeModule } from './change/change.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), 

  ThrottlerModule.forRoot([{
    ttl: 60000,
    limit: 5,
  }]),
  
  
  HttpModule, ChangeModule ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule {}
