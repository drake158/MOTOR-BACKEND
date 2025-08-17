import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { InspirationModule } from './inspiration/inspiration.module';

import { User } from './users/users.entity';
import { Search } from './search/search.entity';

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
        password: cfg.get<string>('DB_PASS', ''),
        database: cfg.get<string>('DB_NAME', 'inspiration'),
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
