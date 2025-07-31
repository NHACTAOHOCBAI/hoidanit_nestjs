import { IsIn, IsNumber, IsOptional, IsString } from "class-validator"

export class GetUserDto {
    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    order?: "ASC" | "DESC"

    @IsOptional()
    @IsString()
    sortBy?: string

    @IsOptional()
    @IsNumber()
    page?: number

    @IsOptional()
    @IsNumber()
    size?: number

    @IsOptional()
    @IsString()
    keyword?: string
}