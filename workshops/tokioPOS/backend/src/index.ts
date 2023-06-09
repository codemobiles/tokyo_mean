import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';
import * as cors from 'cors';
import jwt from './utils/jwt';
const log = require('simple-node-logger').createSimpleLogger('project.log');

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(express.json());
    app.use(cors());
    console.log(process.env.ROOT_PATH);
    app.use(express.static(process.env.ROOT_PATH + '/uploaded'));

    log.debug('Startup');

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        '/api/v2' + route.route,
        jwt.verify,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(8082);

    console.log(
      'Express server has started on port 8082. Open http://localhost:8082/users to see results'
    );
  })
  .catch((error) => console.log(error));
