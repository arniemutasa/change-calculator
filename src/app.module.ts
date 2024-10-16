import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChangeModule } from './change/change.module';

@Module({
  imports: [ChangeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
