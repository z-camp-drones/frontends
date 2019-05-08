import {NextFunction, Request, RequestHandler, Response} from 'express';
import {Promise} from 'es6-promise';
import logger from '../commons/logging/logger';

let requestInProgress = false;

const singleExecution = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    if (requestInProgress) {
        return next({status: 406, message: 'Other request still in progress. Please retry.'});
    }
    logger.info(`Starting a new request.`)
    requestInProgress = true;
    return Promise.resolve(fn(req, res, next))
        .finally(() => {
            requestInProgress = false;
            logger.info(`Request finished, freeing resource.`);
        });
};

module.exports = singleExecution;