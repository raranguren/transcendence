//------------------------- Routes Websocket --------------------------
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { GameManager } from './game.manager.ts';

const gameManager = new GameManager();

const gameGateway: FastifyPluginAsync = async (fastify) => {
	fastify.get('/ws/game/:id', { websocket: true }, (connection, req) => {
		const gameId = (req.params as { id: string }).id;
		const game = gameManager.getGame(gameId);
		
		if (!game) {
			connection.socket.close();
			return;
		}
		
		const interval = setInterval(() => {
			const state = game.getState();
			connection.socket.send(JSON.stringify(state));
		}, 1000 / 60);
		
		connection.socket.on('message', (msg: string) => {
			try {
				const data = JSON.parse(msg);
				if (data.playerId && data.direction) {
					game.movePaddle(data.playerId, data.direction);
				}
			} catch (e) {
				fastify.log.error('Erreur parsing WS message');
			}
		});
		
		connection.socket.on('close', () => {
			clearInterval(interval);
		});
	});
};

export default gameGateway