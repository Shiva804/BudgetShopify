// STORE CRUD -> ADMINS ONLY read/write
import { mongoose } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import { Item } from '../models/Item';
import { Store } from '../models/Store';
import { User } from '../models/User';
import { RequestError } from '../utils/errors/request-error';

export const getItems = async (req: Request, res: Response) => {
	// get items

	let store = await Store.findById(req.params.store);

	if (!store) {
		throw new RequestError('Store does not exist', 400);
	}
	store = await store
		?.populate({ path: 'inventory', model: Item })
		.execPopulate();

	return res.status(200).send(store.inventory);
};

export const getItem = async (req: Request, res: Response) => {
	let store = await Store.findById(req.params.store);
	// let itemid = req.params.id as unknown as mongoose.Types.ObjectId
	let itemid = mongoose.Types.ObjectId(req.params.id);
	if (!store) {
		throw new RequestError('Store does not exist', 400);
	}

	if (store.inventory?.includes(itemid)) {
		let item = await Item.findById(itemid);
		if (item) {
			return res.status(200).send(item);
		} else {
			throw new RequestError('Item does not exist', 400);
		}
	}
};

export const addItem = async (req: Request, res: Response) => {
	// req.body should contain item details
	let itemData = req.body;
	let curruserid = req.currentUser?.id;
	let store = await Store.findOne({ owner: curruserid });
	console.log('store : ', store);
	if (!store) {
		throw new RequestError('Cannot modify this data', 400);
	}
	// store found
	console.log('store : ', store);

	let item = await Item.create(itemData);
	await item.save();
	store.inventory?.push(item);
	await store.save();
	// let ret = await store.populate('inventory').execPopulate();
	// console.log(ret);
	console.log(store);
	store = await store
		.populate({ path: 'inventory', model: Item })
		.execPopulate();

	return res
		.status(201)
		.json({ message: 'item added to inventory', store: store });
};

export const updateItem = async (req: Request, res: Response) => {
	let itemData = req.body;
	let itemId = mongoose.Types.ObjectId(req.params.id);
	let curruserid = req.currentUser?.id;
	let store = await Store.findOne({ owner: curruserid });
	if (!store) {
		throw new RequestError('Cannot modify this data', 400);
	}

	if (store.inventory?.includes(itemId)) {
		let x = await Item.findByIdAndUpdate(itemId, itemData);
		return res.status(200).send(x);
	} else {
		throw new RequestError('Item is not on your inventory', 400);
	}
};

export const deleteItem = async (req: Request, res: Response) => {
	let itemId = mongoose.Types.ObjectId(req.params.id);
	let curruserid = req.currentUser?.id;
	let store = await Store.findOne({ owner: curruserid });
	if (!store) {
		throw new RequestError('Cannot modify this data', 400);
	}
	if (store.inventory?.includes(itemId)) {
		let x = await Item.findByIdAndDelete(itemId);
		console.log('store before pull : ', store);
		// @ts-ignore
		store.inventory.pull({ _id: x.id });
		const newStore = await (await store.save())
			.populate({ path: 'inventory', model: Item })
			.execPopulate();
		console.log('store after pull : ', store);
		return res.status(200).send(newStore);
	} else {
		throw new RequestError('Item is not on your inventory', 400);
	}
};
