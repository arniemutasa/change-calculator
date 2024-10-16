import { Module } from '@nestjs/common';
import { ChangeController } from './change.controller';
import { ChangeService } from './change.service';

@Module({
  controllers: [ChangeController],
  providers: [ChangeService]
})
export class ChangeModule {}
