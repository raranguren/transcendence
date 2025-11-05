export interface User {
	id?: number;
	username: string;
	password: string;
	email: string;
	oauth?: string;
	avatar?: string;

	victory: number;
	defeat: number;
};
