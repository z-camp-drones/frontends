import {NextFunction, Request, RequestHandler, Response} from 'express';
import {Promise} from 'es6-promise';

const asyncMiddleware = (fn: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return Promise.resolve(fn(req, res, next)).catch(e => {
    return next({message: e});
  });
};

module.exports = asyncMiddleware;
