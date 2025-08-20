import { Entity, DeleteDateColumn, Column, OneToMany, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name?: string;

  @Column()
  surname?: string;

  @Column({ unique: true, nullable:false })
  email!: string;

  @Column({nullable:false})
  password!: string; // hash

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

}
