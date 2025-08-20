import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { User } from './users/entity/users.entity';

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
        port: parseInt(cfg.get<string>('DB_PORT', '3006'), 10),
        username: cfg.get<string>('DB_USER', 'root'),
        password: cfg.get<string>('DB_PASS', 'Lolesraro1'),
        database: cfg.get<string>('DB_NAME', 'mi_app'),
        entities: [User],
        synchronize: true, // SOLO DEV
        // logging: true,
      }),
    }),

    UsersModule,
    AuthModule
  ],
})
export class AppModule {}
