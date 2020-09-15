import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUser.execute({ email, password });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...returnUser } = user;

  return response.json({ returnUser, token });
});

export default sessionsRouter;
