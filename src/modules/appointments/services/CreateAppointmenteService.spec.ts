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
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12345678',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create 2 appointments at same time', async () => {
    const date = new Date();

    await createAppointment.execute({
      date,
      provider_id: '12345678',
    });

    expect(
      createAppointment.execute({
        date,
        provider_id: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
