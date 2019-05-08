import {Request, RequestHandler, Response, Router} from 'express';

const router = Router();
const sdk = require('../lib/tellojs');

const asyncMiddleware = require('../infrastructure/async-middleware');
const singleExecution = require('../infrastructure/single-execution-middleware');

const singleExecutionAndAsyncHandler = (fn: RequestHandler) =>
  singleExecution(asyncMiddleware(fn));

const okResponse = (res: Response, result: string, optionalData?: any) => {
  res.json({text: result, status: 'ok', ...optionalData});
};

router.put(
  '/connect',
  singleExecutionAndAsyncHandler(async (req: Request, res: Response) => {
    await sdk.control.connect();
    okResponse(res, 'connected');
  })
);

router.put(
  '/takeoff',
  singleExecutionAndAsyncHandler(async (req: Request, res: Response) => {
    console.log('initiate takeoff ...');
    await sdk.control.takeOff();
    okResponse(res, 'took off');
  })
);

router.put(
  '/land',
  singleExecutionAndAsyncHandler(async (req: Request, res: Response) => {
    await sdk.control.land();
    okResponse(res, 'landed');
  })
);

router.put(
  '/emergency',
  asyncMiddleware(async (req: Request, res: Response) => {
    await sdk.control.emergency();
    okResponse(res, 'emergency-stop');
  })
);

router.put(
  '/stop',
  singleExecutionAndAsyncHandler(async (req: Request, res: Response) => {
    await sdk.control.stop();
    okResponse(res, 'stopped');
  })
);

/**
 * Body: {to:{x: int, y: int, z:int}, speed?: int}
 *
 */
router.put(
  '/go',
  singleExecutionAndAsyncHandler(async (req: Request, res: Response) => {
    let to = req.body && req.body.to;
    console.log(to);
    if (!to || !to.x || !to.y || !to.z) {
      console.log('invalid parameters');
      throw 'The \'to\' parameter is required with x, y, z as numbers';
    }

    let speed = parseInt((req.body && req.body.speed) || '');
    if (isNaN(speed)) {
      speed = 10;
    }
    await sdk.control.go(to, speed);
    okResponse(res, 'stopped');
  })
);

router.put(
  '/rotate/:degrees',
  singleExecutionAndAsyncHandler(async (req: Request, res: Response) => {
    let degrees = parseInt(req.param('degrees'));
    let direction;
    if (degrees < 0) {
      direction = 'clockwise';
      await sdk.control.rotate.clockwise(Math.abs(degrees));
    } else {
      direction = 'counterClockwise';
      await sdk.control.rotate.counterClockwise(Math.abs(degrees));
    }
    okResponse(res, 'rotated', {direction, degrees: Math.abs(degrees)});
  })
);

// error handler
router.use((err: any, req: Request, res: Response) => {
  // render the error page
  err = {
    ...err,
    status: err.status || 500
  };
  res.status(err.status);
  try {
    res.json(err);
  } catch (e) {
    console.error(`Could not render json: `);
    console.error(e);
    res.json({status: 500, message: 'JSON Render issue'});
  }
});

export default router;
