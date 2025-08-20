import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  
  @ApiBearerAuth()

  @Get('me')
  me(@Req() req: any) {
    return req.user; // { userId, email }
  }

  // endpoint público para registrar un nuevo usuario
  @Post()
  createUser(@Body() createUserDto: any) {
    // aquí deberías llamar a un servicio que guarde en la BD
    return {
      message: 'Usuario creado exitosamente',
      data: createUserDto,
    };
  }
}
