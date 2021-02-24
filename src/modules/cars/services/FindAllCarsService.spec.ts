import AppError from '../../../shared/errors/AppError';
import { Exchange } from '../infra/typeorm/schemas/Car';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import CreateCarService from './CreateCarService';
import FindAllCarsService from './FindAllCarsService';

let fakeCarsRepository: FakeCarsRepository;
let createCar: CreateCarService;
let findAllCars: FindAllCarsService;

describe('ShowCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    createCar = new CreateCarService(fakeCarsRepository);
    findAllCars = new FindAllCarsService(fakeCarsRepository);
  });
  it('should be able to list cars with filters', async () => {
    const car1 = await createCar.execute({
      brand: 'Chevrolet',
      model: 'Cruze',
      version: '2.0',
      year: 2019,
      mileage: 50000,
      sale_price: 80000,
      exchange_type: Exchange.AUTOMATICO,
    });

    const car2 = await createCar.execute({
      brand: 'Chevrolet',
      model: 'Cruze',
      version: '2.0',
      year: 2020,
      mileage: 50000,
      sale_price: 80000,
      exchange_type: Exchange.MANUAL,
    });

    const cars = await findAllCars.execute({
      sortData: {
        min_sale_price: 40000,
        max_sale_price: 90000,
        brand: 'Chevrolet',
        model: 'Cruze',
        version: '2.0',
        min_year: 2017,
        max_year: 2021,
        min_mileage: 37000,
        max_mileage: 100000,
        exchange_type: Exchange.AUTOMATICO,
        column: 'brand',
        order: 'ASC',
        skip: 0,
        take: 10,
      },
    });

    expect(cars).toEqual([car1, car2]);
  });
});
