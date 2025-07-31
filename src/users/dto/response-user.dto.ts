import { Exclude, plainToInstance } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class UserResponseDto {
    @IsNotEmpty()
    id: number
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @Exclude()
    password: string;
}
export const convertToUserResponse = (plain: User): UserResponseDto => {
    return plainToInstance(UserResponseDto, plain);
}
export const convertToUsersResponse = (plain: User[]): UserResponseDto[] => {
    return plainToInstance(UserResponseDto, plain);
}