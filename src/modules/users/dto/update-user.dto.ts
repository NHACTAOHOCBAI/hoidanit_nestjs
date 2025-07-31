import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @IsIn(["ADMIN", "USER"])
    role: "ADMIN" | "USER"
}
