import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllCarsService from '@modules/cars/services/FindAllCarsService';
import CreateCarService from '@modules/cars/services/CreateCarService';
import ShowCarService from '@modules/cars/services/ShowCarService';
import UpdateCarService from '@modules/cars/services/UpdateCarService';
import DeleteCarService from '@modules/cars/services/DeleteCarService';

class CarsController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      column,
      order,
      skip,
      take,
      min_sale_price,
      max_sale_price,
      brand,
      model,
      version,
      min_year,
      max_year,
      min_mileage,
      max_mileage,
      exchange_type,
    } = request.query;

    const findAllCars = container.resolve(FindAllCarsService);

    const cars = await findAllCars.execute({
      sortData: {
        column: String(column),
        order: order && order === 'ASC' ? 'ASC' : 'DESC',
        skip: Number(skip),
        take: Number(take),
        min_sale_price: min_sale_price ? Number(min_sale_price) : 0,
        max_sale_price: max_sale_price ? Number(max_sale_price) : 0,
        brand: brand ? String(brand) : null,
        model: model ? String(model) : null,
        version: version ? String(version) : null,
        min_year: min_year ? Number(min_year) : 0,
        max_year: max_year ? Number(max_year) : 0,
        min_mileage: min_mileage ? Number(min_mileage) : 0,
        max_mileage: max_mileage ? Number(max_mileage) : 0,
        exchange_type: exchange_type ? String(exchange_type) : null,
      },
    });

    return response.json(cars);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      model,
      version,
      year,
      mileage,
      exchange_type,
      sale_price,
    } = request.body;

    const createCar = container.resolve(CreateCarService);

    const car = await createCar.execute({
      brand,
      model,
      version,
      year,
      mileage,
      exchange_type,
      sale_price,
    });

    return response.json(car);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCar = container.resolve(ShowCarService);

    const car = await showCar.execute({ id });

    return response.json(car);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      brand,
      model,
      version,
      year,
      mileage,
      exchange_type,
      sale_price,
    } = request.body;

    const updateCar = container.resolve(UpdateCarService);

    const car = await updateCar.execute({
      id,
      brand,
      model,
      version,
      year,
      mileage,
      exchange_type,
      sale_price,
    });

    return response.json(car);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCar = container.resolve(DeleteCarService);

    await deleteCar.execute({ id });

    return response.status(204).json();
  }
}

export default CarsController;
