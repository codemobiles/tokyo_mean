import { ProductController } from './controller/ProductController';
import { UserController } from './controller/UserController';

const authRoutes = [
  {
    method: 'post',
    route: '/login',
    controller: UserController,
    action: 'login',
  },
  {
    method: 'post',
    route: '/register',
    controller: UserController,
    action: 'register',
  },
];

const productRoutes = [
  {
    method: 'get',
    route: '/products',
    controller: ProductController,
    action: 'query',
  },
];

export const Routes = [...authRoutes, ...productRoutes];
