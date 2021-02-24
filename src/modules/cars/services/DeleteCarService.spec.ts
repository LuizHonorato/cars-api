import AppError from '../../../shared/errors/AppError';
import { Exchange } from '../infra/typeorm/schemas/Car';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import CreateCarService from './CreateCarService';
import DeleteCarService from './DeleteCarService';

let fakeCarsRepository: FakeCarsRepository;
let createCar: CreateCarService;
let deleteCar: DeleteCarService;

describe('ShowCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    createCar = new CreateCarService(fakeCarsRepository);
    deleteCar = new DeleteCarService(fakeCarsRepository);
  });
  it('should be able to delete a car', async () => {
    const car = await createCar.execute({
      brand: 'Chevrolet',
      model: 'Cruze',
      version: '2.0',
      year: 2019,
      mileage: 50000,
      sale_price: 80000,
      exchange_type: Exchange.AUTOMATICO,
    });

    await deleteCar.execute({ id: car.id.toString() });

    expect(204);
  });

  it('should not be able to delete non-existing car', async () => {
    await expect(
      deleteCar.execute({
        id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
