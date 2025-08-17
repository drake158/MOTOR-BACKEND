import { Module } from '@nestjs/common';
import { InspirationService } from './inspiration.service';
import { InspirationController } from './inspiration.controller';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [SearchModule],
  providers: [InspirationService],
  controllers: [InspirationController],
})
export class InspirationModule {}
