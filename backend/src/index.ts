import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import {
	loginuser,
	logoutUser,
	registerUser,
} from './controllers/authentication';
import { errorHandler } from './middlewares/error-handler';
import { RequestError } from './utils/errors/request-error';
import cookieSession from 'cookie-session';
import { getUser } from './controllers/user';
import { currentUser } from './middlewares/get-user';
import { createStore, updateStore } from './controllers/store';
import {
	addItem,
	deleteItem,
	getItem,
	getItems,
	updateItem,
} from './controllers/inventory';
import { isAdmin } from './middlewares/isAdmin';
import { addToCart, removeFromCart } from './controllers/cart';
import { isCustomer } from './middlewares/isCustomer';

config();

const app = express();
app.use(
	cors({
		origin: ['http://localhost:3000', 'http://172.26.126.250:3000'],
		exposedHeaders: ['set-cookie'],
		credentials: true,
	})
);
app.use(express.json());

app.set('trust proxy', 1);

app.use(
	cookieSession({
		secret: process.env.SESSION_SECRET,
		// signed: false,
		httpOnly: true,
		sameSite: 'lax',
		secure: false,
		// secureProxy: false,
		// // secure: true,
		maxAge: 24 * 60 * 60 * 1000,
	})
);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('hello world');
});

app.post('/logout', logoutUser);

app.post('/register', registerUser); // REGULAR ROUTE
app.post('/login', loginuser); // REGULAR ROUTE -> IMP: MUST SEND STORE ID AS QUERY PARAM "STORE"

app.get('/user', currentUser, getUser); // USER ROUTE

app.post('/store', [currentUser, isAdmin], createStore); // ADMIN ROUTE
app.put('/store', [currentUser, isAdmin], updateStore); // ADMIN ROUTE

app.get('/:store/items', getItems); // REGULAR ROUTE -> TODO: HANDLE CATEGORY AND SEARCH ROUTES
app.get('/:store/items/:id', getItem); // REGULAR ROUTE
app.post('/item', [currentUser, isAdmin], addItem); // ADMIN ROUTE
app.put('/item/:id', [currentUser, isAdmin], updateItem); // ADMIN ROUTE
app.delete('/item/:id', [currentUser, isAdmin], deleteItem); // ADMIN ROUTE

app.post('/:store/cart/:item', [currentUser, isCustomer], addToCart);
app.delete('/:store/cart/:item', [currentUser, isCustomer], removeFromCart); // TODO: have to check array.pull

app.use(errorHandler);

const main = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI!, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('connected to mongodb');
	} catch (err) {
		console.log(err);
		throw new RequestError('could not connect to database', 500);
	}
	app.listen(PORT, () => {
		console.log('listening on port ', PORT);
	});
};

main();
