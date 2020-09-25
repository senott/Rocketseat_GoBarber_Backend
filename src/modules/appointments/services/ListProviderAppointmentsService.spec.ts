// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list provider appointments', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 7).getTime();
    });

    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 10, 9),
      provider_id: '12345678',
      user_id: '987654321',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 10, 13),
      provider_id: '12345678',
      user_id: '987654321',
    });

    const appointment3 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 10, 16),
      provider_id: '12345678',
      user_id: '987654321',
    });

    const appointments = await listProviderAppointments.execute({
      day: 10,
      month: 5,
      year: 2020,
      provider_id: '12345678',
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2, appointment3]),
    );
  });
});
