import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleCore } from '@nestjs/config';

@Module({
  imports: [ConfigModuleCore.forRoot()],
})
export class ConfigModule {}
