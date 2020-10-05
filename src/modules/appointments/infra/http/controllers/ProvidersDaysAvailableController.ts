/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAvailableDaysByMonthService from '@modules/appointments/services/ListAvailableDaysByMonthService';

export default class ProvidersDaysAvailableController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month } = request.query;

    const daysAvailable = container.resolve(ListAvailableDaysByMonthService);

    const providerDaysAvailable = await daysAvailable.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
    });

    return response.json(providerDaysAvailable);
  }
}
