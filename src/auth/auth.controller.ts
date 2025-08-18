import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private users: UsersService, private auth: AuthService) {}

  @ApiOperation({ summary: 'Registro de usuario' })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const u = await this.users.create(dto);
    return { message: 'Usuario creado', userId: u.id };
  }

  @ApiOperation({ summary: 'Login de usuario (retorna JWT)' })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }
}
