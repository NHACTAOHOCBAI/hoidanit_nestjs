/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';
import { buildSuccessResponse } from 'src/common/dto/success-response.dto';
import { LoginUserDto } from 'src/modules/auth/dto/login-user.dto';
import { JwtAuthGuard } from 'src/common/guards/JwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post("/register")
  async register(@Body() registerUserDto: RegisterUserDto) {
    const createdUser = await this.authService.register(registerUserDto)
    return buildSuccessResponse(HttpStatus.CREATED, "Register user success", createdUser)
  }
  @Post("/login")
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.login(loginUserDto)
    return buildSuccessResponse(HttpStatus.CREATED, "Login user success", user)
  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
