import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import * as fs from 'fs';

interface Config {
  DATABASE_HOST?: string;
  DATABASE_PORT?: number;
  DATABASE_USERNAME?: string;
  DATABASE_PASSWORD?: string;
  DATABASE_NAME?: string;
}

const isLocal = process.env.NODE_ENV !== 'production';

// Load local config if running locally
let localConfig: Config = {}; // Now TypeScript knows the structure
if (isLocal && fs.existsSync('config.local.json')) {
  localConfig = JSON.parse(fs.readFileSync('config.local.json', 'utf-8'));
}

@Module({
  imports: [
    ConfigModule.forRoot(), // Loads environment variables from Azure
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || localConfig.DATABASE_HOST, // Your Azure DB
      port: Number(process.env.DATABASE_PORT) || localConfig.DATABASE_PORT, // Your Azure DB port
      username: process.env.DATABASE_USER || localConfig.DATABASE_USERNAME, // Your Azure DB username
      password: process.env.DATABASE_PASSWORD || localConfig.DATABASE_PASSWORD, // Your Azure DB password
      database: process.env.DATABASE_NAME || localConfig.DATABASE_NAME,
      autoLoadEntities: true, // Automatically loads entities
      synchronize: false, // Auto-create tables (disable in production)
      ssl: {
        rejectUnauthorized: false, // Required for Azure PostgreSQL
      },
      logging: true,
    }),
    CustomersModule, // Registers the Customers Module
  ],
})
export class AppModule {}