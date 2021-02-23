import { Exchange } from '../infra/typeorm/schemas/Car';

export default interface IFindAllCarsDTO {
  column: string;
  order?: 'ASC' | 'DESC';
  skip: number;
  take: number;
  min_sale_price?: number;
  max_sale_price?: number;
  brand?: string;
  model?: string;
  version?: string;
  min_year?: number;
  max_year?: number;
  min_mileage?: number;
  max_mileage?: number;
  exchange_type?: Exchange;
}
