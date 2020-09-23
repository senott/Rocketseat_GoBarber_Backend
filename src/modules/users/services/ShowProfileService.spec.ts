import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ondina Souza',
      email: 'ondina.souza@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Ondina Souza');
    expect(profile.email).toBe('ondina.souza@gmail.com');
  });

  it('should not be able to show the user profile with invalid id', async () => {
    await expect(
      showProfile.execute({
        user_id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
