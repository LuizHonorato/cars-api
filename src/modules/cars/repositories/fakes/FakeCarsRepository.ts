import { v4 as uuid } from 'uuid';
import { ObjectID } from 'mongodb';
import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import IFindAllCarsDTO from '@modules/cars/dtos/IFindAllCarsDTO';
import Car from '@modules/cars/infra/typeorm/schemas/Car';
import ICarsRepository from '../ICarsRepository';

class FakeCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  public async findAllCars(data: IFindAllCarsDTO): Promise<Car[]> {
    const { cars } = this;

    const {
      brand,
      exchange_type,
      max_mileage,
      min_mileage,
      max_sale_price,
      min_sale_price,
      model,
      version,
      min_year,
      max_year,
    } = data;

    if (brand) {
      cars.filter(car => car.brand === brand);
    }

    if (model) {
      cars.filter(car => car.model === model);
    }

    if (version) {
      cars.filter(car => car.version === version);
    }

    if (exchange_type) {
      cars.filter(car => car.exchange_type === exchange_type);
    }

    if (min_year && max_year) {
      cars.filter(car => car.year >= min_year && car.year <= max_year);
    }

    if (min_mileage && max_mileage) {
      cars.filter(
        car => car.mileage >= min_mileage && car.mileage <= max_mileage,
      );
    }

    if (min_sale_price && max_sale_price) {
      cars.filter(
        car =>
          car.sale_price >= min_sale_price && car.sale_price <= max_sale_price,
      );
    }

    return cars;
  }

  public async findById(id: string): Promise<Car | undefined> {
    const findCar = this.cars.find(car => car.id === id);

    return findCar;
  }

  public async findByModel(
    brand: string,
    model: string,
    exchange_type: string,
    year: number,
  ): Promise<Car | undefined> {
    const findCar = this.cars.find(car => {
      return (
        car.brand === brand &&
        car.model === model &&
        car.exchange_type === exchange_type &&
        car.year === year
      );
    });

    return findCar;
  }

  public async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    const objectId = new ObjectID();

    Object.assign(car, { id: uuid() }, data);

    this.cars.push(car);

    return car;
  }

  public async save(car: Car): Promise<Car> {
    const findIndex = this.cars.findIndex(findCar => findCar.id === car.id);

    this.cars[findIndex] = car;

    return car;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.cars.findIndex(findCar => findCar.id === id);

    this.cars.splice(findIndex, 1);
  }
}

export default FakeCarsRepository;
