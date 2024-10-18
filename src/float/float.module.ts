import { Module } from '@nestjs/common';
import { FloatController } from './float.controller';
import { FloatService } from './float.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Float } from './entities/float.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Float])],
  controllers: [FloatController],
  providers: [FloatService],
  exports: [FloatService],
})
export class FloatModule {}
