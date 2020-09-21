import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  // eslint-disable-next-line camelcase
  generate(user_id: string): Promise<UserToken>;
}
