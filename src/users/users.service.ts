
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { hashPassword } from 'src/common/utils/password';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }
  async createUser(user: CreateUserDto) {
    if (await this.findByEmail(user.email) !== null)
      throw new HttpException("Email existed.", HttpStatus.CONFLICT)
    const password = await hashPassword(user.password)
    const data = {
      ...user,
      password: password
    }
    try {
      const { password, ...createdUser } = await this.usersRepository.save(data)
      return createdUser
    }
    catch {
      throw new HttpException('Save user into databse Failed', HttpStatus.BAD_REQUEST)
    }

  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email }
    })
    return user
  }
}
