import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { FloatService } from 'src/float/float.service';

@Injectable()
export class ChangeService {

    

    constructor(private configService: ConfigService, private readonly httpService: HttpService, private readonly floatService: FloatService){
    }

        async callConvertCurrencyAPI(currency: string, amountReceived: number): Promise<any>{
            const API_KEY = this.configService.get('API_KEY');

            const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${currency}/ZAR/${amountReceived}`;

            try {
                const response = await lastValueFrom(
                    this.httpService.get(url)
                )

                return response.data.conversion_result;
            } catch (error) {
                throw new Error("API CALL FAILED")
            }

        }

    async calculateChange(total: number, amountReceived: number, currency: string = 'ZAR') {

 
        const change = amountReceived - total;

        const currentFloat = await this.floatService.getFloat();

        let changeToGive = change;

        let returnChange = {};

        while(changeToGive > 0){
            if(changeToGive >= 50 && currentFloat['50R'] > 0){
               
                returnChange['50R'] = Math.min(Math.floor(changeToGive / 50), currentFloat['50R']);
                changeToGive -= returnChange['50R'] * 50;
                currentFloat['50R'] -= returnChange['50R'];
            }else if(changeToGive >= 20 && currentFloat['20R'] > 0){

                returnChange['20R'] = Math.min(Math.floor(changeToGive / 20), currentFloat['20R']);
                changeToGive -= returnChange['20R'] * 20;
                currentFloat['20R'] -= returnChange['20R'];
            
            }else if(changeToGive >= 10 && currentFloat['10R'] > 0){

                returnChange['10R'] = Math.min(Math.floor(changeToGive / 10), currentFloat['10R']);
                changeToGive -= returnChange['10R'] * 10;
                currentFloat['10R'] -= returnChange['10R'];
            }else if (changeToGive >= 5 && currentFloat['5R'] > 0){

                returnChange['5R'] = Math.min(Math.floor(changeToGive / 5), currentFloat['5R']);
                changeToGive -= returnChange['5R'] * 5;
                currentFloat['5R'] -= returnChange['5R'];
            }else if (changeToGive >= 1 && currentFloat['1R'] > 0){

                returnChange['1R'] = Math.min(Math.floor(changeToGive / 1), currentFloat['1R']);
                changeToGive -= returnChange['1R'] * 1;
                currentFloat['1R'] -= returnChange['1R'];
            }else if (changeToGive >= 0.5 && currentFloat['50c'] > 0){

                returnChange['50c'] = Math.min(Math.floor(changeToGive / 0.5), currentFloat['50c']);
                changeToGive -= returnChange['50c'] * 0.5;
                currentFloat['50c'] -= returnChange['50c'];
            } else if (changeToGive >= 0.2 && currentFloat['20c'] > 0){

                returnChange['20c'] = Math.min(Math.floor(changeToGive / 0.2), currentFloat['20c']);
                changeToGive -= returnChange['20c'] * 0.2;
                currentFloat['20c'] -= returnChange['20c'];
            }else if (changeToGive >= 0.1 && currentFloat['10c'] > 0){
                    
                returnChange['10c'] = Math.min(Math.floor(changeToGive / 0.1), currentFloat['10c']);
                changeToGive -= returnChange['10c'] * 0.1;
                currentFloat['10c'] -= returnChange['10c'];
            }else if (changeToGive >= 0.05 && currentFloat['5c'] > 0){
                    
                returnChange['5c'] = Math.min(Math.floor(changeToGive / 0.05), currentFloat['5c']);
                changeToGive -= returnChange['5c'] * 0.05;
                currentFloat['5c'] -= returnChange['5c'];
            }else if (changeToGive < 0.05){
                changeToGive = 0;
            }

        }

        await this.floatService.updateFloat(currentFloat);


        return {
            TotalPaid: amountReceived,
            TotalDue: total,
            TotalChange: change,
            recommendedChange: returnChange

        }
    }
}
