/* eslint-disable camelcase */
import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(item => item.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(item => item.email === email);
    return user;
  }

  async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(item => item.id === user.id);

    if (userIndex) {
      this.users.splice(userIndex, 1, user);
    }

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });

    this.users.push(user);

    return user;
  }
}

export default UsersRepository;
