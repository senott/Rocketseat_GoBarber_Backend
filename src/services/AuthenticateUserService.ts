import { getRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<{ user: User }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found for this email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('User not found for this email/password combination.');
    }

    delete user.password;

    return { user };
  }
}

export default AuthenticateUserService;
