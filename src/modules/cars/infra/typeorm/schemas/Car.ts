import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

export enum Exchange {
  MANUAL = 'MANUAL',
  AUTOMATICO = 'AUTOMÁTICO',
}

@Entity('cars')
class Car {
  @ObjectIdColumn()
  id: ObjectID | string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  version: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column({
    type: 'enum',
    enum: Exchange,
    default: Exchange.MANUAL,
  })
  exchange_type: Exchange;

  @Column('decimal', { precision: 8, scale: 2 })
  sale_price: number;
}

export default Car;
