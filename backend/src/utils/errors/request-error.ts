import { CustomError } from './custom-error';

export class RequestError extends CustomError {
	constructor(message: string, public statusCode: number) {
		super(message);
		Object.setPrototypeOf(this, RequestError.prototype);
	}

	serializeError() {
		return [{ message: this.message }];
	}
}
