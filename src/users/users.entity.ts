import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Search } from '../search/search.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120, nullable: true })
  name?: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string; // hash

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Search, (s) => s.user)
  searches!: Search[];
}
