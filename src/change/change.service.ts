import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ChangeService {

    constructor(private configService: ConfigService, private readonly httpService: HttpService){}

    

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

    calculateChange(total: number, amountReceived: number, currency: string = 'ZAR') {

 
        const change = amountReceived - total;

        let changeToGive = change;

        let returnChange = {};

     

        while(changeToGive > 0){
            if(changeToGive >= 50){
                returnChange['50R'] = Math.floor(changeToGive / 50);
                changeToGive = changeToGive % 50;
                changeToGive = parseFloat(changeToGive.toFixed(2));
            }else if(changeToGive >= 20){

                returnChange['20R'] = Math.floor(changeToGive / 20);
                changeToGive = (changeToGive % 20);
                changeToGive = parseFloat(changeToGive.toFixed(2));
            
            }else if(changeToGive >= 10){

                returnChange['10R'] = Math.floor(changeToGive / 10);
                changeToGive = (changeToGive % 10);
                changeToGive = parseFloat(changeToGive.toFixed(2));
            }else if (changeToGive >= 5){

                returnChange['5R'] = Math.floor(changeToGive / 5);
                changeToGive = (changeToGive % 5);
                changeToGive = parseFloat(changeToGive.toFixed(2));
            }else if (changeToGive >= 1){

                returnChange['1R'] = Math.floor(changeToGive / 1);
                changeToGive = (changeToGive % 1);
                changeToGive = parseFloat(changeToGive.toFixed(2));
            }else if (changeToGive >= 0.5){

                returnChange['50c'] = Math.floor(changeToGive / 0.5);
                changeToGive = (changeToGive % 0.5);
                changeToGive = parseFloat(changeToGive.toFixed(2));
            } else if (changeToGive >= 0.2){

                returnChange['20c'] = Math.floor(changeToGive / 0.2);
                changeToGive = (changeToGive % 0.2);
                changeToGive = parseFloat(changeToGive.toFixed(2));
            }else if (changeToGive >= 0.1){
                returnChange['10c'] = Math.floor(changeToGive / 0.1);
                changeToGive = (changeToGive % 0.1);
                changeToGive = parseFloat(changeToGive.toFixed(2));
            }else if (changeToGive >= 0.05){
                returnChange['5c'] = Math.floor(changeToGive / 0.05);
                changeToGive = (changeToGive % 0.05);
                changeToGive = parseFloat(changeToGive.toFixed(2));
            }else if (changeToGive < 0.05){
                changeToGive = 0;
            }

        }


        return {
            TotalPaid: amountReceived,
            TotalDue: total,
            TotalChange: change,
            recommendedChange: returnChange

        }
    }
}
