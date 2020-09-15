/* eslint-disable no-useless-constructor */
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserService {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: IRequest): Promise<{ user: User; token: string }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'User not found for this email/password combination.',
        401,
      );
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError(
        'User not found for this email/password combination.',
        401,
      );
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
