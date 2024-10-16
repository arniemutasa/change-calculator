import { IsNumber, IsOptional, IsString } from "class-validator";
import { IsGreaterThan } from "./is-greater-than";





export class CalculateChangeDto {
    @IsNumber()
    total: number;

    @IsNumber()
    @IsGreaterThan('total', {message: 'Amount received must be greater than total'})
    amountReceived: number;

    @IsString()
    @IsOptional()
    currency: string = 'ZAR';
}