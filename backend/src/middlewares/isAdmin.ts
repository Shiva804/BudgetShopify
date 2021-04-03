import { NextFunction, Request, Response } from 'express';
import { RequestError } from '../utils/errors/request-error';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	if (req.currentUser?.role === 'ADMIN') next();
	else throw new RequestError('unauthorised', 400);
};
