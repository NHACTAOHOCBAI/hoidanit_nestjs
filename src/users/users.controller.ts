import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { buildSuccessResponse } from 'src/common/dto/success-response.dto';
import { GetUserDto } from 'src/users/dto/get-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.createUser(createUserDto)
    return buildSuccessResponse(HttpStatus.CREATED, "Create user success", createdUser)
  }

  @Get()
  async findAll(@Query() getUserDto: GetUserDto) {
    const Users = await this.usersService.findAll(getUserDto);
    return buildSuccessResponse(HttpStatus.OK, "Get all user success", Users)
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const User = await this.usersService.findById(id);
    return buildSuccessResponse(HttpStatus.OK, "Get a user success", User)
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.updateUser(id, updateUserDto);
    return buildSuccessResponse(HttpStatus.OK, "Update a user success", {})
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.usersService.remove(id);
    return buildSuccessResponse(HttpStatus.OK, "Delete a user success", {})
  }
}
