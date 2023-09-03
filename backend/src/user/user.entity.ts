import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'text',
    name: 'name',
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    type: 'text',
    name: 'email',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    type: 'text',
    name: 'phone',
    nullable: false,
    default: '',
  })
  phone: string;

  @Column({
    type: 'int',
    name: 'position_id',
    nullable: false,
    default: 0,
  })
  position_id: number;

  @Column({
    type: 'text',
    name: 'image',
    nullable: false,
    default: '',
  })
  image: string;

  @Column({
    type: 'bigint',
    name: 'date',
    nullable: false,
    default: 0,
  })
  date: number;
}
