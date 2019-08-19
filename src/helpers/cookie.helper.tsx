import Cookies from 'universal-cookie';

class CookieStorage {

	private cookie = new Cookies();
	private readonly C_USER: string = 'user';

	private set(name: string, value: any) {
		let date = new Date();
		date.setUTCDate(date.getUTCDate() + 1);
		this.cookie.set(name, value, { path: '/', expires: date });
	}

	private get(name: string) {
		return this.cookie.get(name);
	}

	private remove(name: string) {
		this.cookie.remove(name, { path: '/' });
	}

	public setUser(user: any) {
		this.set(this.C_USER, user);
	}

	public getUser() {
		return this.get(this.C_USER);
	}

	public removeUser() {
		this.remove(this.C_USER);
	}

	public setValue(name: string, value: any) {
		this.set(name, value);
	}

	public getValue(name: string, defaultValue?: any) : any {
		return this.get(name) || defaultValue;
	}

}

export const cookieStorage = new CookieStorage();