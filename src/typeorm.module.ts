import { Module } from '@nestjs/common';
import { TypeOrmModule as TypeOrmModuleCore } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModuleCore.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE_TYPE') as 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: +configService.get<string>('DATABASE_PORT')!,
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: !!configService.get<string>('DATABASE_LOGGING'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TypeOrmModule {}
