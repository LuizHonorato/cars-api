import AppError from '../../../shared/errors/AppError';
import { Exchange } from '../infra/typeorm/schemas/Car';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import CreateCarService from './CreateCarService';

let fakeCarsRepository: FakeCarsRepository;
let createCar: CreateCarService;

describe('CreateCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    createCar = new CreateCarService(fakeCarsRepository);
  });
  it('should be able to create a new car', async () => {
    const car = await createCar.execute({
      brand: 'Chevrolet',
      model: 'Cruze',
      version: '2.0',
      year: 2019,
      mileage: 50000,
      sale_price: 80000,
      exchange_type: Exchange.AUTOMATICO,
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with existent model, version, year and exchange_type', async () => {
    await createCar.execute({
      brand: 'Chevrolet',
      model: 'Cruze',
      version: '2.0',
      year: 2019,
      mileage: 50000,
      sale_price: 80000,
      exchange_type: Exchange.AUTOMATICO,
    });

    await expect(
      createCar.execute({
        brand: 'Chevrolet',
        model: 'Cruze',
        version: '2.0',
        year: 2019,
        mileage: 50000,
        sale_price: 80000,
        exchange_type: Exchange.AUTOMATICO,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
