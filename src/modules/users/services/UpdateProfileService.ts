/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';
// import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  current_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    current_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const existingEmail = await this.usersRepository.findByEmail(email);

    if (existingEmail && user_id !== existingEmail.id) {
      throw new AppError('This email is already being used.');
    }

    user.name = name;
    user.email = email;

    if (password) {
      if (!current_password) {
        throw new AppError(
          'Current password must be informed to update password.',
        );
      }

      if (
        !(await this.hashProvider.compareHash(current_password, user.password))
      ) {
        throw new AppError('Invalid current password provided.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    await this.cacheProvider.invalidateByPrefix('providers-list');

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
