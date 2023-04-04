import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { Users } from '../entity/Users';

export class UserController {
  private userRepository = AppDataSource.getMongoRepository(Users);

  login(request, response, next) {
    return this.userRepository.find();
  }

  register(request, response, next) {
    try {
      req.body.created = savedValue(req.body.created, new Date());
      req.body.level = savedValue(req.body.level, "normal");
      req.body.__v = savedValue(req.body.__v, 0);

      req.body.password = await bcrypt.hash(req.body.password, 8);
      const doc = await this.userRepository.save(req.body);
      return { result: "ok", message: doc };
    } catch (e) {
      return { result: "nok", message: "invalid data" };
    }
  }
}
