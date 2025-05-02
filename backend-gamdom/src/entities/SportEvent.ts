import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class SportEvent {
  @PrimaryGeneratedColumn('uuid')
  eventId!: string;

  @Column()
  eventName!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  odds!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
