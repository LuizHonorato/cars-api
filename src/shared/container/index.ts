import { container } from 'tsyringe';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
