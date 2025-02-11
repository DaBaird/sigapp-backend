import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'agency.postgres.database.azure.com', // Your Azure DB
      port: 5432,
      username: 'terence', // Your username
      password: 'PA$$word10',
      database: 'agency', // Change if needed
      autoLoadEntities: true, // Automatically loads entities
      synchronize: true, // Auto-create tables (disable in production)
      ssl: true,
    }),
    CustomersModule, // Registers the Customers Module
  ],
})
export class AppModule {}