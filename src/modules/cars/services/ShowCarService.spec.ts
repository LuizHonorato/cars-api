import AppError from '../../../shared/errors/AppError';
import { Exchange } from '../infra/typeorm/schemas/Car';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import CreateCarService from './CreateCarService';
import ShowCarService from './ShowCarService';

let fakeCarsRepository: FakeCarsRepository;
let createCar: CreateCarService;
let showCar: ShowCarService;

describe('ShowCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    createCar = new CreateCarService(fakeCarsRepository);
    showCar = new ShowCarService(fakeCarsRepository);
  });
  it('should be able to show a car', async () => {
    const car = await createCar.execute({
      brand: 'Chevrolet',
      model: 'Cruze',
      version: '2.0',
      year: 2019,
      mileage: 50000,
      sale_price: 80000,
      exchange_type: Exchange.AUTOMATICO,
    });

    const findCar = await showCar.execute({ id: car.id.toString() });

    expect(findCar.brand).toBe('Chevrolet');
    expect(findCar.model).toBe('Cruze');
  });

  it('should not be able to show non-existing car', async () => {
    await expect(
      showCar.execute({
        id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
