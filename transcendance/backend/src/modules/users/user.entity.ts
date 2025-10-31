interface Game {
	
	tournament: boolean;

	playerOneId: number;
	playerOneScore: number;
	
	playerTwoId: number;
	playerTwoScore: number;
	
	id: number;
	timeStamp: Date;

	result: number;
	started: boolean;
	ended:	boolean;
};

interface User {
	id?: number;
	username: string;
	password: string;
	email: string;
	oauth?: string;
	avatar: string;

	victory: number;
	defeat: number;
};

export type { User }