import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_name' })
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
