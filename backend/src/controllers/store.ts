// STORE CRUD -> ADMINS ONLY read/write
import { mongoose } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import { Store } from '../models/Store';
import { User } from '../models/User';
import { RequestError } from '../utils/errors/request-error';

export const createStore = async (req: Request, res: Response) => {
	// create store
	const { name, ...storeData } = req.body;

	const storeExists = await Store.findOne({ name: name });
	if (storeExists) {
		// TODO: have to check for shop id too later.
		throw new RequestError('Store name already in use', 400);
	}

	let currUser = req.currentUser;
	if (currUser?.role === 'CUSTOMER') {
		// cant create store
		throw new RequestError('You cannot create a store', 401);
	}
	// create store
	//  TODO: CHECK IF THE USER HAS OTHER STORES BEFORE PROCEEDING
	const data = { name, ...storeData, owner: currUser?.id };
	// let userdata = await User.findById(currUser?.id)
	// userdata.

	const otherStores = await Store.findOne({ owner: currUser?.id });
	if (otherStores) {
		throw new RequestError('A user can have only one store at a time', 400);
	}

	let newStore = await Store.create(data);
	await newStore.save();

	return res
		.status(201)
		.json({ message: 'store created successfully', store: newStore });
};

export const updateStore = async (req: Request, res: Response) => {
	// update store

	// const { name, ...storeData } = req.body;
	// const dbstore = await Store.findOne({ name: name });

	const currUser = req.currentUser;

	const { name, address } = req.body;
	if (name == '' || address == '') {
		throw new RequestError('Invalid form', 400);
	}
	const dbstore = await Store.findById(currUser?.store);
	if (!dbstore) {
		// TODO: have to check for shop id too later.
		throw new RequestError('Store doesnt exists', 400);
	}

	// check if the owner is updating
	if (dbstore.owner != req.currentUser?.id) {
		throw new RequestError(
			'You do not have permission to modify this data',
			401
		);
	}

	let data = { name, address, owner: dbstore.owner };
	await dbstore.update(data);
	return res
		.status(200)
		.json({ message: 'updated Successfully', data: dbstore });
};
