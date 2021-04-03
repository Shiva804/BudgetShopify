import { mongoose } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import { Item } from '../models/Item';
import { Store } from '../models/Store';
import { User } from '../models/User';
import { RequestError } from '../utils/errors/request-error';

export const addToCart = async (req: Request, res: Response) => {
	// req.body should contain item id and quantityRequired

	if (!req.body.quantityRequired) req.body.quantityRequired = 1;

	let storeId = mongoose.Types.ObjectId(req.params.store);
	let itemId = mongoose.Types.ObjectId(req.params.item);
	// we have the item  id and store id
	let store = await Store.findById(storeId);
	if (!store) {
		throw new RequestError('Store doesnt exist', 400);
	}

	if (!store.inventory?.includes(itemId)) {
		throw new RequestError('Item doesnt exist', 400);
	}
	let item = await Item.findById(itemId);
	if (!item) {
		throw new RequestError('Item doesnt exist', 400);
	}
	if (item.quantityAvailable) {
		console.log('error here?');
		if (item.quantityAvailable - parseInt(req.body.quantityRequired) < 0) {
			throw new RequestError('Not enough quantity', 400);
		}
		console.log('error here?');

		let remaining =
			item.quantityAvailable - parseInt(req.body.quantityRequired);

		item.quantityAvailable = remaining;
		console.log('error here?');

		let user = await User.findById(req.currentUser?.id);
		user?.cart?.push(item.id);
		await user?.save();
		console.log('error here?');
		console.log(typeof item.quantityAvailable);
		await Item.findByIdAndUpdate(item.id, {
			quantityAvailable: item.quantityAvailable,
		});
		// await item.save();

		// return res.status(200).json({ message: 'added to cart', data: item });
		const popUser = await user
			?.populate({ path: 'cart', model: Item })
			.execPopulate();
		console.log(popUser);
		return res.status(200).json({
			message: 'added to cart',
			data: item,
			cart: popUser?.cart,
		});
	}
};

export const removeFromCart = async (req: Request, res: Response) => {
	let storeId = mongoose.Types.ObjectId(req.params.store);
	let itemId = mongoose.Types.ObjectId(req.params.item);
	// we have the item  id and store id

	if (!req.body.quantityRequired) req.body.quantityRequired = 1;

	let store = await Store.findById(storeId);
	if (!store) {
		throw new RequestError('Store doesnt exist', 400);
	}

	if (!store.inventory?.includes(itemId)) {
		throw new RequestError('Item doesnt exist', 400);
	}
	let item = await Item.findById(itemId);
	if (!item) {
		throw new RequestError('Item doesnt exist', 400);
	}
	if (item.quantityAvailable) {
		let increasedQuantity =
			item.quantityAvailable + parseInt(req.body.quantityRequired);

		item.quantityAvailable = increasedQuantity;
		let user = await User.findById(req.currentUser?.id);
		// @ts-ignore
		user?.cart?.pull(item.id);
		await user?.save();
		await item.save();
		const popUser = await user
			?.populate({ path: 'cart', model: Item })
			.execPopulate();
		console.log(popUser);
		return res.status(200).json({
			message: 'removed from cart',
			data: item,
			cart: popUser?.cart,
		});
	}
};
