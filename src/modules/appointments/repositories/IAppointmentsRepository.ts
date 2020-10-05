/* eslint-disable camelcase */
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAppointmentsByMonthDTO from '../dtos/IFindAppointmentsByMonthDTO';
import IFindAppointmentsByDayDTO from '../dtos/IFindAppointmentsByDayDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDto): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAppointmentsByMonth(
    data: IFindAppointmentsByMonthDTO,
  ): Promise<Appointment[]>;
  findAppointmentsByDay(
    data: IFindAppointmentsByDayDTO,
  ): Promise<Appointment[]>;
}
