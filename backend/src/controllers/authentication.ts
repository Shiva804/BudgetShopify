import { Request, Response } from 'express';
import { User } from '../models/User';
import { RequestError } from '../utils/errors/request-error';
import jwt from 'jsonwebtoken';
import { Password } from '../utils/Password';
import { Store } from '../models/Store';
import { mongoose } from '@typegoose/typegoose';
import { Item } from '../models/Item';

export const logoutUser = (req: Request, res: Response) => {
	req.session = null;
	return res.status(200).json({ message: 'logout success' });
};

// create
export const registerUser = async (req: Request, res: Response) => {
	// res.send('hello wrodlsd');
	let { email, password, role } = req.body;
	if (role === null) {
		role = 'CUSTOMER';
	}

	// let storeid = req.query.store;

	// body contains username and password and store name
	const userExists = await User.findOne({ email: email });
	if (userExists) {
		// TODO: have to check for shop id too later.
		throw new RequestError('Email already in use', 400);
	}
	if (req.query.store) {
		let storeid = mongoose.Types.ObjectId(req.query.store as string);
		const store = await Store.findById(storeid);
		if (!store) throw new RequestError('Store doesnt exist', 400);
		if (role === 'CUSTOMER') {
			let user = await User.create({
				email,
				password,
				role,
				store: store.id,
			});
			await user.save();
			const payload = {
				id: user.id,
				email: user.email,
				role: user.role,
				store: store.id,
			};

			let token = jwt.sign(payload, process.env.JWT_SECRET!, {
				expiresIn: '1h',
			});

			req.session = { jwt: token };
			const popUser = await user
				?.populate({ path: 'cart', model: Item })
				.execPopulate();

			return res.status(201).json({
				message: 'New User Created successfully',
				user: popUser,
				token: token,
			});
		}
	}

	// CREATE ADMIN

	try {
		let user = await User.create({ email, password, role });
		await user.save();
		let newStore = await Store.create({ owner: user.id });
		await newStore.save();
		user.store = newStore.id;
		await user.save();
		const payload = {
			id: user.id,
			email: user.email,
			role: user.role,
			store: newStore.id,
			// TODO: Should have shop id too
		};

		let token = jwt.sign(payload, process.env.JWT_SECRET!, {
			expiresIn: '1h',
		});

		req.session = { jwt: token };

		return res.status(201).json({
			message: 'New User Created successfully',
			user,
			store: newStore.id,
			token: token,
		});
	} catch (err) {
		console.log('erroring');
		throw new RequestError('Invalid Form', 400);
	}
};

export const loginuser = async (req: Request, res: Response) => {
	let { email, password, role } = req.body;
	if (!role) {
		role = 'CUSTOMER';
	}
	const dbuser = await User.findOne({ email: email });
	if (!dbuser) {
		// TODO: have to check for shop id too later.
		throw new RequestError('Invalid Credentials', 400);
	}
	if (role !== dbuser.role) throw new RequestError('Invalid Request', 400);
	const bool = await Password.compare(dbuser.password, password);

	// user exists
	if (bool) {
		// matching
		// let store = await Store.
		if (role === 'CUSTOMER') {
			// check if the customer is in the correct store
			const storeid = req.query.store as string;
			if (!storeid)
				throw new RequestError(
					'Must send store in params if logging in as customer',
					400
				);
			console.log('db.store: ', dbuser.store);
			// console.log('storeid: ', mongoose.Types.ObjectId(storeid));
			if (dbuser.store?.toString() !== storeid)
				throw new RequestError('Invalid store id', 400);
		}

		const payload = {
			id: dbuser.id,
			email: dbuser.email,
			role: dbuser.role,
			store: dbuser.store,
		};

		let token = jwt.sign(payload, process.env.JWT_SECRET!, {
			expiresIn: '1h',
		});
		req.session = { jwt: token };
		const popUser = await dbuser
			?.populate({ path: 'cart', model: Item })
			.execPopulate();

		return res.status(200).json({
			message: 'login successful',
			user: popUser,
			token,
		});
	} else {
		throw new RequestError('Invalid Credentials', 400);
	}
};
