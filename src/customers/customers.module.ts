import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])], // Register entity
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}