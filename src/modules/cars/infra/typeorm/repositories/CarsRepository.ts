import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import IFindAllCarsDTO from '@modules/cars/dtos/IFindAllCarsDTO';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import { ObjectID } from 'mongodb';
import { getMongoRepository, MongoRepository } from 'typeorm';
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

    let query: any = {};

    if (brand) {
      query.where = {
        ...query.where,
        brand: { $eq: brand },
      };
    }

    if (model) {
      query.where = {
        ...query.where,
        model: { $eq: model },
      };
    }

    if (version) {
      query.where = {
        ...query.where,
        version: { $eq: version },
      };
    }

    if (exchange_type) {
      query.where = {
        ...query.where,
        exchange_type: { $eq: exchange_type },
      };
    }

    if (min_year && max_year) {
      query.where = {
        ...query.where,
        year: {
          $gte: min_year,
          $lte: max_year,
        },
      };
    }

    if (min_mileage && max_mileage) {
      query.where = {
        ...query.where,
        mileage: {
          $gte: min_mileage,
          $lte: max_mileage,
        },
      };
    }

    if (min_sale_price && max_sale_price) {
      query.where = {
        ...query.where,
        sale_price: {
          $gte: min_sale_price,
          $lte: max_sale_price,
        },
      };
    }

    query.take = take;
    query.skip = skip;
    query.order = {
      [column]: order,
    };

    const cars = await this.ormRepository.find(query);

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

  async findByModel(
    brand: string,
    model: string,
    exchange_type: string,
    year: number,
  ): Promise<Car | undefined> {
    const car = await this.ormRepository.findOne({
      where: {
        brand,
        model,
        exchange_type,
        year,
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
    await this.ormRepository.delete(id);
  }
}

export default CarsRepository;
