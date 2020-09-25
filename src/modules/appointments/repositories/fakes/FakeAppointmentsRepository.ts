/* eslint-disable camelcase */
import { uuid } from 'uuidv4';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAppointmentsByMonthDTO from '@modules/appointments/dtos/IFindAppointmentsByMonthDTO';
import IFindAppointmentsByDayDTO from '@modules/appointments/dtos/IFindAppointmentsByDayDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAppointmentsByMonth({
    provider_id,
    month,
    year,
  }: IFindAppointmentsByMonthDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAppointmentsByDay({
    provider_id,
    day,
    month,
    year,
  }: IFindAppointmentsByDayDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(item =>
      isEqual(item.date, date),
    );

    return appointment;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDto): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id,
      user_id,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
