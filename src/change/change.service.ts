import { Injectable } from '@nestjs/common';

@Injectable()
export class ChangeService {
    calculateChange(total: number, amountReceived: number){
 
        const change = amountReceived - total;
        let changeToGive = change;

        let returnChange = {};

        let i = 0;

        while(changeToGive > 0){
            if(changeToGive >= 50){
                returnChange['50R'] = Math.floor(changeToGive / 50);
                changeToGive = changeToGive % 50;
            }else if(changeToGive >= 20){

                returnChange['20R'] = Math.floor(changeToGive / 20);
                changeToGive = changeToGive % 20;
            }else if(changeToGive >= 10){

                returnChange['10R'] = Math.floor(changeToGive / 10);
                changeToGive = changeToGive % 10;
            }else if (changeToGive >= 5){

                returnChange['5R'] = Math.floor(changeToGive / 5);
                changeToGive = changeToGive % 5;
            }else if (changeToGive >= 1){

                returnChange['1R'] = Math.floor(changeToGive / 1);
                changeToGive = changeToGive % 1;
            }else if (changeToGive >= 0.5){

                returnChange['50c'] = Math.floor(changeToGive / 0.5);
                changeToGive = changeToGive % 0.5;
            } else if (changeToGive >= 0.2){

                returnChange['20c'] = Math.floor(changeToGive / 0.2);
                changeToGive = changeToGive % 0.2;
            }else if (changeToGive >= 0.1){
                returnChange['10c'] = Math.floor(changeToGive / 0.1);
                changeToGive = changeToGive % 0.1;
            }else if (changeToGive >= 0.05){
                returnChange['5c'] = Math.floor(changeToGive / 0.05);
                changeToGive = changeToGive % 0.05;
            }
            i++;

        }


        return {
            TotalPaid: amountReceived,
            TotalDue: total,
            TotalChange: change,
            recommendedChange: returnChange


        }
    }
}
