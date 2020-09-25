import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '12345678',
      user_id: '987654321',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create 2 appointments at same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const date = new Date(2020, 4, 10, 13);

    await createAppointment.execute({
      date,
      provider_id: '12345678',
      user_id: '987654321',
    });

    expect(
      createAppointment.execute({
        date,
        provider_id: '12345678',
        user_id: '987654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment in the past', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '12345678',
        user_id: '987654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with himself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 10).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '12345678',
        user_id: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before opening time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 6).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 7),
        provider_id: '12345678',
        user_id: '987654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment after closing time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 16).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 18),
        provider_id: '12345678',
        user_id: '987654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
