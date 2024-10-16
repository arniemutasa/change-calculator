import { Injectable } from '@nestjs/common';

@Injectable()
export class ChangeService {
    calculateChange(total: number, amountReceived: number){
        const acceptedCoinsAndNotes = [
            '50R',
            '20R',
            '10R',
            '5R',
            '1R',
            '50C',
            '20C',
            '10C',
            '5C',
          ];

        const change = amountReceived - total;
        let changeToGive = change;

        let returnChange = {};

        let i = 0;

        while(changeToGive > 0){
            if(changeToGive >= 50){
                returnChange[acceptedCoinsAndNotes[i]] = Math.floor(changeToGive / 50);
                changeToGive = changeToGive % 50;
            }else if(changeToGive >= 20){
                returnChange[acceptedCoinsAndNotes[i]] = Math.floor(changeToGive / 20);
                changeToGive = changeToGive % 20;
            }else if(changeToGive >= 10){
                returnChange[acceptedCoinsAndNotes[i]] = Math.floor(changeToGive / 10);
                changeToGive = changeToGive % 10;
            }else if (changeToGive >= 5){
                returnChange[acceptedCoinsAndNotes[i]] = Math.floor(changeToGive / 5);
                changeToGive = changeToGive % 5;
            }else if (changeToGive >= 1){
                returnChange[acceptedCoinsAndNotes[i]] = Math.floor(changeToGive / 1);
                changeToGive = changeToGive % 1;
            }else if (changeToGive >= 0.5){
                returnChange[acceptedCoinsAndNotes[i]] = Math.floor(changeToGive / 0.5);
                changeToGive = changeToGive % 0.5;
            } else if (changeToGive >= 0.2){
                returnChange[acceptedCoinsAndNotes[i]] = Math.floor(changeToGive / 0.2);
                changeToGive = changeToGive % 0.2;
            }else if (changeToGive >= 0.1){
                returnChange[acceptedCoinsAndNotes[i]] = Math.floor(changeToGive / 0.1);
                changeToGive = changeToGive % 0.1;
            }else if (changeToGive >= 0.05){
                returnChange[acceptedCoinsAndNotes[i]] = Math.floor(changeToGive / 0.05);
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
