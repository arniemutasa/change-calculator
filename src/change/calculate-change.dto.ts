import { IsNumber } from "class-validator";





export class CalculateChangeDto {
    @IsNumber()
    total: number;

    @IsNumber()
    amountReceived: number;
}