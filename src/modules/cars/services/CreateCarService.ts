import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Car, { Exchange } from '../infra/typeorm/schemas/Car';
import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  brand: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  exchange_type: Exchange;
  sale_price: number;
}

@injectable()
class CreateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({
    brand,
    model,
    version,
    year,
    mileage,
    exchange_type,
    sale_price,
  }: IRequest): Promise<Car> {
    const checkCarExists = await this.carsRepository.findByModel(
      brand,
      model,
      exchange_type,
      year,
    );

    if (checkCarExists) {
      throw new AppError('This car is already exist on database');
    }

    const car = await this.carsRepository.create({
      brand,
      model,
      version,
      year,
      mileage,
      exchange_type,
      sale_price,
    });

    return car;
  }
}

export default CreateCarService;
