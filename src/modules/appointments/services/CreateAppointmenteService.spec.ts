import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 6).getTime();
    });
  });

  it('should be able to create new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '12345678',
      user_id: '987654321',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create 2 appointments at same time', async () => {
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
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 9, 11),
        provider_id: '12345678',
        user_id: '987654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with himself', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '12345678',
        user_id: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before opening time', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 7),
        provider_id: '12345678',
        user_id: '987654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment after closing time', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 18),
        provider_id: '12345678',
        user_id: '987654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
