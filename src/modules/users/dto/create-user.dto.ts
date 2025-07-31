import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    @IsIn(["ADMIN", "USER"])
    role: "ADMIN" | "USER"
}
