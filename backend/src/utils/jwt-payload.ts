import { mongoose } from '@typegoose/typegoose';

export interface jwtPayload {
	id: mongoose.Types.ObjectId;
	email: string;
	role: string;
	store: mongoose.Types.ObjectId;
}
