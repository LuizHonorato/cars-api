import AppError from '../../../shared/errors/AppError';
import { Exchange } from '../infra/typeorm/schemas/Car';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import UpdateCarService from './UpdateCarService';

let fakeCarsRepository: FakeCarsRepository;
let updateCar: UpdateCarService;

describe('UpdateCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    updateCar = new UpdateCarService(fakeCarsRepository);
  });
  it('should be able to update a car', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Chevrolet',
      model: 'Cruze',
      version: '2.0',
      year: 2019,
      mileage: 50000,
      sale_price: 80000,
      exchange_type: Exchange.AUTOMATICO,
    });

    const carUpdated = await updateCar.execute({
      id: car.id.toString(),
      brand: 'Chevrolet Atualizado',
      model: 'Cruze Atualizado',
      version: '2.0',
      year: 2019,
      mileage: 50000,
      sale_price: 80000,
      exchange_type: Exchange.AUTOMATICO,
    });

    expect(carUpdated.brand).toBe('Chevrolet Atualizado');
    expect(carUpdated.model).toBe('Cruze Atualizado');
  });

  it('should not be able to update a non-existing car', async () => {
    await expect(
      updateCar.execute({
        id: 'non-existing-id',
        brand: 'Chevrolet Atualizado',
        model: 'Cruze Atualizado',
        version: '2.0',
        year: 2019,
        mileage: 50000,
        sale_price: 80000,
        exchange_type: Exchange.AUTOMATICO,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
