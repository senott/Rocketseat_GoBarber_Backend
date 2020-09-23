import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;

let fakeHashProvider: FakeHashProvider;

let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ondina Souza',
      email: 'ondina.souza@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Ondina Luiza Souza',
      email: 'ondina.luiza.souza@gmail.com',
    });

    expect(updatedUser.name).toBe('Ondina Luiza Souza');
    expect(updatedUser.email).toBe('ondina.luiza.souza@gmail.com');
  });

  it('should not be able to update the user profile with existing email address', async () => {
    await fakeUsersRepository.create({
      name: 'Ondina Souza',
      email: 'ondina.souza@gmail.com',
      password: '123456',
    });

    const updatedUser = await fakeUsersRepository.create({
      name: 'Ondina Maria Souza',
      email: 'ondina.m.souza@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: updatedUser.id,
        name: 'Ondina Maria Souza',
        email: 'ondina.souza@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ondina Souza',
      email: 'ondina.souza@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Ondina Souza',
      email: 'ondina.souza@gmail.com',
      current_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the user password without current password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ondina Souza',
      email: 'ondina.souza@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Ondina Souza',
        email: 'ondina.souza@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user password with wrong current password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ondina Souza',
      email: 'ondina.souza@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Ondina Souza',
        email: 'ondina.souza@gmail.com',
        current_password: 'wrong-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
