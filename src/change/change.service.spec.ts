import { Test, TestingModule } from '@nestjs/testing';
import { ChangeService } from './change.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { FloatService } from 'src/float/float.service';

const mockHttpService = {
  get: jest.fn().mockReturnValue({ data: { conversion_result: 1 } }),
};

const mockFloatRepository = {
  findOne: jest.fn().mockResolvedValue({
   
      '50R': 5,
      '20R': 10,
      '10R': 15,
      '5R': 20,
      '1R': 30,
      '50c': 25,
      '20c': 50,
      '10c': 100,
      '5c': 200,
  }),
};

const mockFloatService = {
  getFloat: jest.fn().mockResolvedValue(mockFloatRepository.findOne()), // Use mocked repository
  updateFloat: jest.fn().mockResolvedValue(true),
};

describe('ChangeService', () => {
  let service: ChangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ChangeService, ConfigService, { provide: HttpService, useValue: mockHttpService },{ provide: FloatService, useValue: mockFloatService }],
    }).compile();

    service = module.get<ChangeService>(ChangeService);
  });

  

  it('Should calculate the correct change and recommend the most efficient combination of notes', () => {
    const total = 120;
    const amountReceived = 200;
    const breakdown = {
      TotalPaid: 200,
      TotalDue: 120,
      TotalChange: 80,
      recommendedChange: {
        '50R': 1,
        '20R': 1,
        '10R': 1,
      }
    }

    const result = service.calculateChange(total, amountReceived);
    expect(result).toEqual(breakdown);
  })

  it('Should calculate the correct change and recommend most efficiant combination and include coins', () => {
    const total = 93.5;
    const amountReceived = 100;
    const breakdown = {
      TotalPaid: 100,
      TotalDue: 93.5,
      TotalChange: 6.5,
      recommendedChange: {
        '5R': 1,
        '1R': 1,
        '50c': 1
      }
    }

    const result = service.calculateChange(total, amountReceived, 'ZAR');
    expect(result).toEqual(breakdown);
  })

  it('Should return empty change object if no change is due',() => {
    const total = 200;
    const amountReceived = 200;
    const breakdown = {
      TotalPaid: 200,
      TotalDue: 200,
      TotalChange: 0,
      recommendedChange: {}
    }

    const result = service.calculateChange(total, amountReceived, 'ZAR');
    expect(result).toEqual(breakdown);
  })
});
