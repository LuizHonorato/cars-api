import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Car, { Exchange } from '../infra/typeorm/schemas/Car';
import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  exchange_type: Exchange;
  sale_price: number;
}

@injectable()
class UpdateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({
    id,
    brand,
    model,
    version,
    year,
    mileage,
    exchange_type,
    sale_price,
  }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(id);

    if (!car) {
      throw new AppError('Car not found!');
    }

    car.brand = brand;
    car.model = model;
    car.version = version;
    car.year = year;
    car.mileage = mileage;
    car.exchange_type = exchange_type;
    car.sale_price = sale_price;

    return this.carsRepository.save(car);
  }
}

export default UpdateCarService;
