import { ProductController } from './controller/ProductController';
import { UserController } from './controller/UserController';

export const Routes = [
  {
    method: 'get',
    route: '/product/query',
    controller: ProductController,
    action: 'query',
  },
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove',
  },
];
