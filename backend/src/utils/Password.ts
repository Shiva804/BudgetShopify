import bcrypt from 'bcryptjs';

export class Password {
	static async toHash(password: string) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	}

	static async compare(storedPassword: string, givenPassword: string) {
		const bool = await bcrypt.compare(givenPassword, storedPassword);
		return bool;
	}
}
