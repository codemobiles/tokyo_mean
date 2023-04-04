import { ProductController } from './controller/ProductController';
import { UserController } from './controller/UserController';

export const Routes = [
  {
    method: 'get',
    route: '/login',
    controller: UserController,
    action: 'login',
  },
];
