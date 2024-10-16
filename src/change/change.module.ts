import { Module } from '@nestjs/common';
import { ChangeController } from './change.controller';
import { ChangeService } from './change.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ChangeController],
  providers: [ChangeService]
})
export class ChangeModule {}
