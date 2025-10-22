import { Game } from './game.engine.js'

class GameManager {
	constructor(){
		this.games = new Map();
	}

	createGame(playerId1, playerId2) {
		const gameId = `game-${Date.now()}`;
		const game = new Game(playerId1, playerId2, options);
		this.games.set(gameId, game);
		game.start();
		return {gameId, game};
	}

	getGame(gameId) {
		return this.games.get(gameId);
	}

	endGame(gameId) {
		const game = this.games.get(gameId);
		if (game) {
			game.stop();
			this.games.delete(gameId);
		}
	}

	removeGame(gameId) {
		const game = this.games.get(gameId);
		if (game) {
			this.games.delete(gameId);
		}
	}
}

export { GameManager }
