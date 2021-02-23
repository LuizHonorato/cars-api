import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import IFindAllCarsDTO from '@modules/cars/dtos/IFindAllCarsDTO';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import { ObjectID } from 'mongodb';
import {
  getConnection,
  getMongoRepository,
  MongoRepository,
  WhereExpression,
} from 'typeorm';
import Car from '../schemas/Car';

class CarsRepository implements ICarsRepository {
  private ormRepository: MongoRepository<Car>;

  constructor() {
    this.ormRepository = getMongoRepository(Car);
  }

  async findAllCars(data: IFindAllCarsDTO): Promise<Car[]> {
    const {
      column,
      skip,
      take,
      brand,
      exchange_type,
      max_mileage,
      min_mileage,
      max_sale_price,
      min_sale_price,
      model,
      order,
      version,
      min_year,
      max_year,
    } = data;

    const cars = this.ormRepository.find({
      where: (qb: WhereExpression) => {
        if (brand) {
          qb.where({
            brand,
          });
        }

        if (model) {
          qb.where({
            model,
          });
        }

        if (version) {
          qb.where({
            version,
          });
        }

        if (exchange_type) {
          qb.where({
            exchange_type,
          });
        }

        if (min_year && max_year) {
          qb.where({
            year: {
              $gte: min_year,
              $lte: max_year,
            },
          });
        }

        if (min_mileage && max_mileage) {
          qb.where({
            mileage: {
              $gte: min_mileage,
              $lte: max_mileage,
            },
          });
        }

        if (min_sale_price && max_sale_price) {
          qb.where({
            sale_price: {
              $gte: min_sale_price,
              $lte: max_sale_price,
            },
          });
        }
      },
      skip,
      take,
      order: {
        [column]: order,
      },
    });

    return cars;
  }

  async findById(id: string): Promise<Car | undefined> {
    const objectId = new ObjectID(id);

    const car = await this.ormRepository.findOne({
      where: {
        _id: objectId,
      },
    });

    return car;
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create(data);

    await this.ormRepository.save(car);

    return car;
  }

  async save(car: Car): Promise<Car> {
    return this.ormRepository.save(car);
  }

  async delete(id: string): Promise<void> {
    const objectId = new ObjectID(id);

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Car)
      .where('_id = :objectId', { objectId })
      .execute();
  }
}

export default CarsRepository;
