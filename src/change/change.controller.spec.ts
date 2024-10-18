import { Test, TestingModule } from '@nestjs/testing';
import { ChangeController } from './change.controller';
import { ChangeService } from './change.service';
import { CalculateChangeDto } from './dto/calculate-change.dto';
import exp from 'constants';

describe('ChangeController', () => {
  let controller: ChangeController;
  let service: ChangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChangeController],
      providers: [{
        provide: ChangeService,
        useValue: {
          calculateChange: jest.fn()
        }
      }]
    }).compile();

    controller = module.get<ChangeController>(ChangeController);
    service = module.get<ChangeService>(ChangeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the change service with the correct arguments', async () => {
    const calculateChangeDto: CalculateChangeDto = {
      total: 120,
      amountReceived: 200,
      currency: 'ZAR',
    }

    const result = {
      TotalPaid: 200,
      TotalDue: 120,
      TotalChange: 80,
      recommendedChange: {
        '50R': 1,
        '20R': 1,
        '10R': 1,
      }
    }

    jest.spyOn(service, 'calculateChange').mockReturnValue(Promise.resolve(result));
    expect(await controller.calculateChange(calculateChangeDto)).toEqual(result);
    expect(service.calculateChange).toHaveBeenCalledWith(120, 200, 'ZAR');
  });
});
