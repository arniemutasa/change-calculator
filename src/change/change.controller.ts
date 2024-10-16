import { Body, Controller, Post } from '@nestjs/common';
import { ChangeService } from './change.service';
import { CalculateChangeDto } from './calculate-change.dto';

@Controller('change')
export class ChangeController {
    constructor(private readonly changeService: ChangeService) {}
    
    
    @Post("calculate")
    async calculateChange(@Body() calculateChangeDto: CalculateChangeDto){

        const currency = calculateChangeDto.currency || 'ZAR';
        
        let finalAmountReceived = calculateChangeDto.amountReceived;

        if(calculateChangeDto.currency !== 'ZAR'){
            const output = await this.changeService.callConvertCurrencyAPI(currency, calculateChangeDto.amountReceived);
            finalAmountReceived = output;
        }

        calculateChangeDto.amountReceived = parseFloat(finalAmountReceived.toFixed(2));

        return this.changeService.calculateChange(calculateChangeDto.total, calculateChangeDto.amountReceived, calculateChangeDto.currency);
    }
}
