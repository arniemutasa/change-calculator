import { IsInt, IsOptional, Min } from "class-validator";

export class UpdateFloatDto {

    @IsOptional()
    @IsInt()
    @Min(0)
    '50R': number;

    @IsOptional()
    @IsInt()
    @Min(0)
    '20R': number;

    @IsOptional()
    @IsInt()
    @Min(0)
    '10R': number;

    @IsOptional()
    @IsInt()
    @Min(0)
    '5R': number;

    @IsOptional()
    @IsInt()
    @Min(0)
    '1R': number;

    @IsOptional()
    @IsInt()
    @Min(0)
    '50c': number;

    @IsOptional()
    @IsInt()
    @Min(0)
    '20c': number;

    @IsOptional()
    @IsInt()
    @Min(0)
    '10c': number;

    @IsOptional()
    @IsInt()
    @Min(0)
    '5c': number;
}