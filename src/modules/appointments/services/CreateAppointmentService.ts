/* eslint-disable camelcase */
import { isBefore, startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const startTime = 8;
    const lastTime = 17;

    if (
      appointmentDate.getHours() < startTime ||
      appointmentDate.getHours() > lastTime
    ) {
      throw new AppError(
        `Appointment time should be between ${startTime}:00 and ${lastTime}:00.`,
      );
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('Appointment cannot be created in the past.');
    }

    if (provider_id === user_id) {
      throw new AppError('User cannot have an appointment with himself.');
    }

    if (await this.appointmentsRepository.findByDate(appointmentDate)) {
      throw new AppError('This appointment is already booked.');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
