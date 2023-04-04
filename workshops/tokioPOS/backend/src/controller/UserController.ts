import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { Users } from '../entity/Users';

export class UserController {
  private userRepository = AppDataSource.getMongoRepository(Users);

  login(request, response, next) {
    return this.userRepository.find();
  }

  register(request, response, next) {
    console.log(JSON.stringify(request.body));
    return this.userRepository.create(request.body);
  }
}
