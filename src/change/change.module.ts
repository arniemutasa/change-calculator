import { Module } from '@nestjs/common';
import { ChangeController } from './change.controller';
import { ChangeService } from './change.service';
import { HttpModule } from '@nestjs/axios';
import { FloatModule } from 'src/float/float.module';

@Module({
  imports: [HttpModule, FloatModule],
  controllers: [ChangeController],
  providers: [ChangeService]
})
export class ChangeModule {}
