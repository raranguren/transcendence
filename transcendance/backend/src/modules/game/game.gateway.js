//------------------------- Routes Websocket --------------------------

// plugins/websocket.plugin.js
await fastify.register(import('@fastify/websocket'))

// modules/game/game.gateway.js
fastify.register(async function (fastify) {
	fastify.get('/ws/game/:id', { websocket: true }, (connection, req) => {
		const gameId = req.params.id;
		const game = gameManager.getGame(gameId);
		if (!game) return connection.socket.close();

		const interval = setInterval(() => {
			connection.socket.send(JSON.stringify(game.getState()));
		}, 1000 / 60);

		connection.socket.on('message', (msg) => {
			try {
				const data = JSON.parse(msg);
				game.movePaddle(data.playerId, data.direction);
			} catch (e) {}
		});

		connection.socket.on('close', () => clearInterval(interval));
	});
});
