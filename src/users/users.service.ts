import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly UserRepository: Repository<User>
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const exists = await this.UserRepository.findOne({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Email ya registrado');

    const user = this.UserRepository.create({
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
    });
    return this.UserRepository.save(user);
  }

  findByEmail(email: string) {
    return this.UserRepository.findOne({ where: { email } });
  }
}
