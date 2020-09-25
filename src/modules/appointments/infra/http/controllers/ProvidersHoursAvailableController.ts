/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAvailableHoursByDayService from '@modules/appointments/services/ListAvailableHoursByDayService';

export default class ProvidersDaysAvailableController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { year, month, day } = request.body;

    const hoursAvailable = container.resolve(ListAvailableHoursByDayService);

    const providerHoursAvailable = await hoursAvailable.execute({
      provider_id,
      year,
      month,
      day,
    });

    return response.json(providerHoursAvailable);
  }
}
