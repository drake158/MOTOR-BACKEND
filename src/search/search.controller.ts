import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SearchService } from './search.service';

@ApiTags('searches')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('searches')
export class SearchController {
  constructor(private service: SearchService) {}

  @Get()
  listMine(@Req() req: any) {
    return this.service.findByUser(req.user.userId);
  }
}
