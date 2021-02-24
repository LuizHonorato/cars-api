import Car from '../infra/typeorm/schemas/Car';
import ICreateCarDTO from '../dtos/ICreateCarDTO';
import IFindAllCarsDTO from '../dtos/IFindAllCarsDTO';

export default interface ICarsRepository {
  findAllCars(data: IFindAllCarsDTO): Promise<Car[]>;
  findById(id: string): Promise<Car | undefined>;
  findByModel(
    brand: string,
    model: string,
    exchange_type: string,
    year: number,
  ): Promise<Car | undefined>;
  create(data: ICreateCarDTO): Promise<Car>;
  save(car: Car): Promise<Car>;
  delete(id: string): Promise<void>;
}
