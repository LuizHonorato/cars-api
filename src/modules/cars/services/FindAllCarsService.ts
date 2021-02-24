import { inject, injectable } from 'tsyringe';
import Car from '../infra/typeorm/schemas/Car';
import ICarsRepository from '../repositories/ICarsRepository';

interface SortData {
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

interface IRequest {
  sortData: SortData;
}

@injectable()
class FindAllCarsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({ sortData }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAllCars(sortData);

    return cars;
  }
}

export default FindAllCarsService;
