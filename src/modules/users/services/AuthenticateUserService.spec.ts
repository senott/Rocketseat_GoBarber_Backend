import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'José da Silva',
      email: 'jose.silva@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'jose.silva@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be not able to authenticate user with invalid e-mail', async () => {
    await expect(
      authenticateUser.execute({
        email: 'jose.silva@gamil.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with invalid password', async () => {
    await fakeUsersRepository.create({
      name: 'José da Silva',
      email: 'jose.silva@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'jose.silva@gmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
