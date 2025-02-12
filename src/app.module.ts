import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // ✅ Loads environment variables from Azure
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST, // Your Azure DB
      port: Number(process.env.DATABASE_PORT) || 5432, // Your Azure DB port
      username: process.env.DATABASE_USER, // Your Azure DB username
      password: process.env.DATABASE_PASSWORD, // Your Azure DB password
      database: process.env.DATABASE_NAME,
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