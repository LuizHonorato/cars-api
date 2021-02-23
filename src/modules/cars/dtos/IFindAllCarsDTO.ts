export default interface IFindAllCarsDTO {
  column: string;
  order?: 'ASC' | 'DESC';
  skip: number;
  take: number;
  min_sale_price?: number;
  max_sale_price?: number;
  brand?: string | null;
  model?: string | null;
  version?: string | null;
  min_year?: number;
  max_year?: number;
  min_mileage?: number;
  max_mileage?: number;
  exchange_type?: string | null;
}
