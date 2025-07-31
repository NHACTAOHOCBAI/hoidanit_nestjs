import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/modules/auth/dto/login-user.dto';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';
import { comparePassword } from 'src/common/utils/password';
import { UsersService } from 'src/modules/users/users.service';
import { UserResponseDto } from 'src/modules/users/dto/response-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }

    async register(user: RegisterUserDto): Promise<UserResponseDto> {
        return await this.usersService.createUser({ ...user, role: "USER" })
    }

    async login(user: LoginUserDto) {
        const existingUser = await this.usersService.findByEmail(user.email)
        if (!existingUser) {
            throw new HttpException("Wrong email", HttpStatus.BAD_REQUEST)
        }
        if (!await comparePassword(user.password, existingUser.password))
            throw new HttpException("Wrong password", HttpStatus.BAD_REQUEST)
        const payload = { user: existingUser };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
