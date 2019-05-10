import {Request, Response, Router} from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(' Do not use this page, use the React App!');
});

export default router;
