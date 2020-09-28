import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProvidersDaysAvailableController from '../controllers/ProvidersDaysAvailableController';
import ProvidersHoursAvailableController from '../controllers/ProvidersHoursAvailableController';

const providersRouter = Router();

const providersController = new ProvidersController();
const availableDaysController = new ProvidersDaysAvailableController();
const availableHoursController = new ProvidersHoursAvailableController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/available-days',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  availableDaysController.index,
);

providersRouter.get(
  '/:providerid/available-hours',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  availableHoursController.index,
);

export default providersRouter;
