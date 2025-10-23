import { Game } from './game.engine.ts'
import type { GameOptions } from './game.engine.ts'

interface CreatedGame {
	gameId: string;
	game: Game;
}

class GameManager {
	private games: Map<string, Game>;

	constructor(){
		this.games = new Map<string, Game>();
	}

	public createGame(playerId1: string, playerId2: string, options: GameOptions = {}):  CreatedGame {
		const gameId = `game-${Date.now()}`;
		const game = new Game(playerId1, playerId2, options);
		this.games.set(gameId, game);
		game.start();
		return {gameId, game};
	}

	public getGame(gameId: string): Game | undefined {
		return this.games.get(gameId);
	}

	public endGame(gameId: string): void {
		const game = this.games.get(gameId);
		if (game) {
			game.stop();
			this.games.delete(gameId);
		}
	}

	public removeGame(gameId: string): void {
		const game = this.games.get(gameId);
		if (game) {
			this.games.delete(gameId);
		}
	}
}

export { GameManager }
