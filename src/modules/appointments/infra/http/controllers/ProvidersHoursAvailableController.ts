/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAvailableHoursByDayService from '@modules/appointments/services/ListAvailableHoursByDayService';

export default class ProvidersDaysAvailableController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { year, month, day } = request.query;

    const hoursAvailable = container.resolve(ListAvailableHoursByDayService);

    const providerHoursAvailable = await hoursAvailable.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    return response.json(providerHoursAvailable);
  }
}
