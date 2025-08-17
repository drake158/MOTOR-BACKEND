import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Search {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 20 })
  type!: 'images' | 'phrases' | 'videos';

  // simple-array => "a,b,c" en la BD
  @Column('simple-array')
  tokens!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (u) => u.searches, { onDelete: 'CASCADE' })
  user!: User;
}
