import { Body, Controller, Get, Put } from '@nestjs/common';
import { FloatService } from './float.service';
import { Float } from './entities/float.entity';
import { UpdateFloatDto } from './dto/update-float.dto';

@Controller('float')
export class FloatController {
    constructor(private readonly floatService: FloatService){}


    
    @Get('initialize')
    async initializeFloat(){
        const initialFloat: Float = {
            "id": 1,
            '50R': 10,
            '20R': 20,
            '10R': 30,
            '5R': 40,
            '1R': 50,
            '50c': 100,
            '20c': 200,
            '10c': 300,
            '5c': 400,
          };

        return await this.floatService.updateFloat(initialFloat);
    }

    @Put('update')
    async updateFloat(@Body() updateFloatDto: UpdateFloatDto){
        return await this.floatService.updateFloat(updateFloatDto);
    }

    @Get()
    async getFloat(){
        return await this.floatService.getFloat();
    }
}
