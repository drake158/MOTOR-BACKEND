import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SearchService } from '../search/search.service';
import { InspirationQueryDto } from './dto/inspiration-query.dto';
import { InspirationService } from './inspiration.service';

@ApiTags('inspirations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('inspirations')
export class InspirationController {
  constructor(
    private insp: InspirationService,
    private searches: SearchService,
  ) {}

  @ApiOperation({ summary: 'Obtener resultados de inspiración (simulados) y guardar búsqueda' })
  @ApiQuery({ name: 'type', enum: ['images', 'phrases', 'videos'] })
  @ApiQuery({ name: 'tokens', required: false, description: 'csv: a,b,c' })
  @Get()
  async get(@Query() q: InspirationQueryDto, @Req() req: any) {
    const tokens = (q.tokens ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    // Guardar búsqueda del usuario
    await this.searches.logSearch(req.user.userId, q.type, tokens);

    // Retornar resultados simulados
    const results = this.insp.getResults(q.type, tokens);
    return { type: q.type, tokens, results };
  }
}
