import { Module } from '@nestjs/common';
import { ChangeModule } from './change/change.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), HttpModule, ChangeModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
