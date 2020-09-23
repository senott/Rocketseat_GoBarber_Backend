import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAppointmentsByMonthDTO from '../dtos/IFindAppointmentsByMonthDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDto): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAppointmentsByMonth(
    data: IFindAppointmentsByMonthDTO,
  ): Promise<Appointment[]>;
}
