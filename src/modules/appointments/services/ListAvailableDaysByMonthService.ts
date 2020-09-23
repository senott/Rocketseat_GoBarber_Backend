/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{ day: number; available: boolean }>;

@injectable()
class ListAvailableDaysByMonthService {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAppointmentsByMonth(
      {
        provider_id,
        year,
        month,
      },
    );

    console.log(appointments);

    return [{ available: false, day: 1 }];
  }
}

export default ListAvailableDaysByMonthService;
