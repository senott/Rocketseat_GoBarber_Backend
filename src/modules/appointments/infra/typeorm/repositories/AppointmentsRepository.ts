/* eslint-disable camelcase */
import { getRepository, Raw, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAppointmentsByMonthDTO from '@modules/appointments/dtos/IFindAppointmentsByMonthDTO';
import IFindAppointmentsByDayDTO from '@modules/appointments/dtos/IFindAppointmentsByDayDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findAppointmentsByMonth({
    provider_id,
    year,
    month,
  }: IFindAppointmentsByMonthDTO): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${month
              .toString()
              .padStart(2, '0')}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAppointmentsByDay({
    provider_id,
    year,
    month,
    day,
  }: IFindAppointmentsByDayDTO): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${day
              .toString()
              .padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDto): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
