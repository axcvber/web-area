import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  fullName: string;

  @Column()
  username: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  bio?: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  location?: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  website?: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  currentHashedRefreshToken?: string;

  @Column({ default: false })
  isRegisteredWithGoogle: boolean;

  @Column({
    nullable: true,
  })
  @Exclude()
  avatar?: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;
}
