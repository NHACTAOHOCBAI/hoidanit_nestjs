import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
}
