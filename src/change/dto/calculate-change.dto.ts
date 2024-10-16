import { IsNumber, IsOptional, IsString } from "class-validator";





export class CalculateChangeDto {
    @IsNumber()
    total: number;

    @IsNumber()
    amountReceived: number;

    @IsString()
    @IsOptional()
    currency: string = 'ZAR';
}