import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { InspirationModule } from './inspiration/inspiration.module';
import { SearchModule } from './search/search.module';
import { UsersModule } from './users/users.module';

import { Search } from './search/search.entity';
import { User } from './users/users.entity';

@Module({
  imports: [
    // Variables de entorno (.env)
    ConfigModule.forRoot({ isGlobal: true }),

    // Conexión MySQL local
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'mysql',
        host: cfg.get<string>('DB_HOST', 'localhost'),
        port: parseInt(cfg.get<string>('DB_PORT', '3306'), 10),
        username: cfg.get<string>('DB_USER', 'root'),
        password: cfg.get<string>('DB_PASS', 'Lolesraro1'),
        database: cfg.get<string>('DB_NAME', 'mi_app'),
        entities: [User, Search],
        synchronize: true, // SOLO DEV
        // logging: true,
      }),
    }),

    UsersModule,
    AuthModule,
    SearchModule,
    InspirationModule,
  ],
})
export class AppModule {}
