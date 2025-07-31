import { Exclude, plainToInstance } from "class-transformer";
import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/modules/users/entities/user.entity";

export class UserResponseDto {
    @IsNotEmpty()
    id: number
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @IsIn(["ADMIN", "USER"])
    role: "ADMIN" | "USER"
}
export const convertToUserResponse = (plain: User): UserResponseDto => {
    return plainToInstance(UserResponseDto, plain);
}
export const convertToUsersResponse = (plain: User[]): UserResponseDto[] => {
    return plainToInstance(UserResponseDto, plain);
}