import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChangeModule } from './change/change.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), HttpModule, ChangeModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
