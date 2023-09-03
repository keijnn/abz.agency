import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'text',
    name: 'value',
    nullable: false,
    default: '',
  })
  value: string;

  @Column({
    type: 'bigint',
    name: 'date',
    nullable: false,
    default: 0,
  })
  date: number;
}
