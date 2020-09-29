/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    const cacheData = this.cacheProvider.recover('teste');

    console.log(cacheData);

    const appointments = await this.appointmentsRepository.findAppointmentsByDay(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    await this.cacheProvider.save('teste', 'dados de teste');

    return appointments;
  }
}

export default ListProviderAppointmentsService;
