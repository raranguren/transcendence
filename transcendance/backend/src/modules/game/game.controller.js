const gameManager = require ('./game.manager');

async function gameRoutes(fastify, options) {
	fastify.post('/game', (req, res) => {
		const{playerId1, playerId2} = req.body;
		const {gameId} = gameManager.createGame(playerId1, playerId2, options);
		res.send({gameId});
	});

	fastify.post('/game/:id/move', (req, res) => {
		const {id} = req.params;
		const {playerId, direction} = req.body;

		const game = gameManager.getGame(id);
		if (!game) {
			return res.status(404).send({error: 'Game not found'});
		}

		game.movePaddle(playerId, direction);
		res.send({status: 'ok'});
	});

	fastify.get('/game/:id/state', (req, res) => {
		const {id} = req.params;
		const game = gameManager.getGame(id);
		if (!game) {
			return res.status(404).send({error: 'Game not found'});
		}

		res.send(game.getState());
	});
}

module.exports = gameRoutes;