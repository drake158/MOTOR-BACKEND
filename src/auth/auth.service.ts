
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.users.findByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.password);
    return ok ? user : null;
    }

  async login(email: string, password: string) {
    const user = await this.validate(email, password);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwt.signAsync(payload);
    return { access_token };
  }
}
