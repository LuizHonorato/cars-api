import { Exchange } from '../infra/typeorm/schemas/Car';

export default interface ICreateCarDTO {
  brand: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  exchange_type: Exchange;
  sale_price: number;
}
