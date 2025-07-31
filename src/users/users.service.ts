
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { hashPassword } from 'src/common/utils/password';
import { convertToUserResponse, convertToUsersResponse, UserResponseDto } from 'src/users/dto/response-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { GetUserDto } from 'src/users/dto/get-users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async createUser(user: CreateUserDto): Promise<UserResponseDto> {
    if (await this.findByEmail(user.email) !== null)
      throw new HttpException("Email existed.", HttpStatus.CONFLICT)
    const password = await hashPassword(user.password)
    const data = {
      ...user,
      password: password
    }
    const createdUser = await this.usersRepository.save(data)
    return convertToUserResponse(createdUser)
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<void> {
    const existingUser = await this.findById(id)
    if (user.email !== existingUser.email && (await this.findByEmail(user.email)) !== null)
      throw new HttpException("Email existed", HttpStatus.CONFLICT)
    await this.usersRepository.update(id, user)
  }

  async findAll(getUserDto: GetUserDto) {
    const { keyword, sortBy = "createdAt", page, size, order = "DESC", email } = getUserDto
    const [users, total] = await this.usersRepository.findAndCount({
      where: [
        ...(keyword ? [{ name: ILike(`%${keyword}%`) }, { email: ILike(`%${keyword}%`) }] : [])
      ],
      order: { [sortBy]: order },
      ...(
        page && size && {
          take: size,
          skip: (page - 1) * size
        }
      )
    })
    return {
      data: convertToUsersResponse(users),
      total,
      page,
      size,
      totalPages: size ? Math.ceil(total / size) : 0
    }
  }

  async findById(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user === null)
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST)
    return convertToUserResponse(user)
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user === null)
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST)
    await this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } })
    return user
  }
}
