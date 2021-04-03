import {
	prop,
	getModelForClass,
	pre,
	modelOptions,
	DocumentType,
	Ref,
} from '@typegoose/typegoose';
import { UserClass } from './User';

@modelOptions({
	options: { customName: 'Items' },
})
export class ItemClass {
	@prop()
	public name?: string;

	@prop()
	public price?: string;

	@prop()
	public category?: string;

	@prop({ default: 0 })
	public quantityAvailable?: number;

	@prop({ default: 'https://semantic-ui.com/images/wireframe/image.png' })
	public image?: string;

	// @prop()
	// public ownerName?: string;

	@prop({ ref: () => UserClass })
	public owner: Ref<UserClass>;
	// TODO: HAVE TO FILL WITH MORE DATA
}

const Item = getModelForClass(ItemClass);

export { Item };
