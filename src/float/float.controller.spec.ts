import { Test, TestingModule } from '@nestjs/testing';
import { FloatController } from './float.controller';

describe('FloatController', () => {
  let controller: FloatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FloatController],
    }).compile();

    controller = module.get<FloatController>(FloatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
