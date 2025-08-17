import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Search } from './search.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Search) private repo: Repository<Search>,
    private users: UsersService,
  ) {}

  async logSearch(userId: number, type: Search['type'], tokens: string[]) {
    const user = await this.users.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Aquí TS ya sabe que user es User (no null)
    const s = this.repo.create({ user, type, tokens });
    return this.repo.save(s);
  }

  findByUser(userId: number) {
    return this.repo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }
}
