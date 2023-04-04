import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { Users } from '../entity/Users';
import { savedValue } from '../utils/cm-util';
import * as bcrypt from 'bcryptjs';

export class UserController {
  private userRepository = AppDataSource.getMongoRepository(Users);

  login(request, response, next) {
    try {
      const { username, password } = req.body;

      let doc = await this.userRepository.findOne({
        where: { username },
      });

      if (doc) {
        let isPasswordValid = await bcrypt.compare(password, doc.password);
        if (isPasswordValid) {
          const payload = {
            id: doc._id,
            level: doc.level,
            username: doc.username,
          };
          let token = jwt.sign(payload);

          res.json({ result: 'ok', token, message: 'success' });
        } else {
          res.json({ result: 'nok', message: 'invalid password' });
        }
      } else {
        res.json({ result: 'nok', message: 'invalid username' });
      }
    } catch (error) {
      res.json({ result: 'nok', error });
    }
  }

  async register(req, response, next) {
    try {
      req.body.created = savedValue(req.body.created, new Date());
      req.body.level = savedValue(req.body.level, 'normal');
      req.body.__v = savedValue(req.body.__v, 0);

      req.body.password = await bcrypt.hash(req.body.password, 8);
      const doc = await this.userRepository.save(req.body);
      return { result: 'ok', message: doc };
    } catch (e) {
      return { result: 'nok', message: 'invalid data' };
    }
  }
}
