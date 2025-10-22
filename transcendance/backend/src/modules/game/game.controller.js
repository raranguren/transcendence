// -------------------------------- Routes HTTP ----------------------------------

const gameManager = require ('./game.manager');

async function gameRoutes(fastify, options) {
	//Launch game
	fastify.post('/game', (req, res) => {
		const{playerId1, playerId2} = req.body;
		const {gameId} = gameManager.createGame(playerId1, playerId2, options);
		res.send({gameId});
	});

	//Get game state for debug 
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