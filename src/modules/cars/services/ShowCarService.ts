import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Car from '../infra/typeorm/schemas/Car';
import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(id);

    if (!car) {
      throw new AppError('Car not found!');
    }

    return car;
  }
}

export default ShowCarService;
