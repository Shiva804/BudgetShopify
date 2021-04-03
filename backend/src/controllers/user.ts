// USER CRUD ROUTES -> for both admins and customers
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RequestError } from '../utils/errors/request-error';
import { jwtPayload } from '../utils/jwt-payload';

export const getUser = (req: Request, res: Response) => {
	// get the current user
	// authenticated route
	res.status(200).send(req.currentUser);
};
