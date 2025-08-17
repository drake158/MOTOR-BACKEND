import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UsersController {
  // ejemplo sencillo: quién soy (requiere JWT)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('me')
  me(@Req() req: any) {
    return req.user; // { userId, email }
  }
}
