import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CarsController from '../controllers/CarsController';

const carsRouter = Router();
const carsController = new CarsController();

carsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      column: Joi.string().required(),
      order: Joi.string().required(),
      skip: Joi.number().required(),
      take: Joi.number().required(),
      min_sale_price: Joi.number(),
      max_sale_price: Joi.number(),
      brand: Joi.string(),
      model: Joi.string(),
      version: Joi.string(),
      min_year: Joi.number(),
      max_year: Joi.number(),
      min_mileage: Joi.number(),
      max_mileage: Joi.number(),
      exchange_type: Joi.string(),
    },
  }),
  carsController.index,
);

carsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      brand: Joi.string().required(),
      model: Joi.string().required(),
      version: Joi.string().required(),
      sale_price: Joi.number().required(),
      year: Joi.number().required(),
      mileage: Joi.number().required(),
      exchange_type: Joi.string().required(),
    },
  }),
  carsController.create,
);

carsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  carsController.show,
);

carsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      brand: Joi.string().required(),
      model: Joi.string().required(),
      version: Joi.string().required(),
      sale_price: Joi.number().required(),
      year: Joi.number().required(),
      mileage: Joi.number().required(),
      exchange_type: Joi.string().required(),
    },
  }),
  carsController.update,
);

carsRouter.delete('/:id', carsController.delete);

export default carsRouter;
