import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListAvailableHoursByDayService from './ListAvailableHoursByDayService';

let listHours: ListAvailableHoursByDayService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListAvailableDaysByMonth', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listHours = new ListAvailableHoursByDayService(fakeAppointmentsRepository);
  });

  it('should be able to list the days where the provider is available to work', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '121212',
      date: new Date(2020, 9, 5, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '121212',
      date: new Date(2020, 9, 5, 10, 0, 0),
    });

    const availability = await listHours.execute({
      provider_id: '121212',
      year: 2020,
      month: 10,
      day: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
