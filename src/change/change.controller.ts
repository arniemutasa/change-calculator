import { Body, Controller, Post } from '@nestjs/common';
import { ChangeService } from './change.service';
import { CalculateChangeDto } from './calculate-change.dto';

@Controller('change')
export class ChangeController {
    constructor(private readonly changeService: ChangeService) {}
    
    
    @Post("calculate")
    calculateChange(@Body() calculateChangeDto: CalculateChangeDto){
        return this.changeService.calculateChange(calculateChangeDto.total, calculateChangeDto.amountReceived);
    }
}
