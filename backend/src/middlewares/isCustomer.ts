import { NextFunction, Request, Response } from 'express';
import { RequestError } from '../utils/errors/request-error';

export const isCustomer = (req: Request, res: Response, next: NextFunction) => {
	if (req.currentUser?.role === 'CUSTOMER') next();
	else throw new RequestError('unauthorised', 400);
};
