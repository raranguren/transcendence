// -------------------------------- Routes HTTP ----------------------------------

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { GameManager } from './game.manager.ts'
import type { GameOptions } from './game.engine.ts'

const gameManager = new GameManager();

interface CreateGameBody {
	PlayerId1: string;
	PlayerId2: string;
	options ?: GameOptions;
}

const createGameSchema = {
  body: {
    type: 'object',
    properties: {
      PlayerId1: { type: 'string' },
      PlayerId2: { type: 'string' },
      options: {
        type: 'object',
        properties: {
          height: { type: 'number' },
          width: { type: 'number' },
          paddleWidth: { type: 'number' },
          paddleHeight: { type: 'number' },
          paddleSpeed: { type: 'number' },
          ballSpeedX: { type: 'number' },
          ballSpeedY: { type: 'number' },
          ballRadius: { type: 'number' }
        },
        additionalProperties: false,
        nullable: true
      }
    },
    required: ['PlayerId1', 'PlayerId2'],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        gameId: { type: 'string' }
      }
    }
  }
};

async function gameRoutes(fastify: FastifyInstance, options: any): Promise<void> {
	//Launch game
	fastify.post('/game', { schema : createGameSchema }, (req: FastifyRequest<{ Body : CreateGameBody }>, res: FastifyReply) => {
		const{ PlayerId1, PlayerId2, options} = req.body;
		const {gameId} = gameManager.createGame(PlayerId1, PlayerId2, options ?? {});
		res.send({ gameId });
	});

	//Get game state for debug 
	fastify.get('/game/:id/state', (req, res) => {
		const { id } = req.params as {id: string };
		const game = gameManager.getGame(id);
		if (!game) {
			return res.status(404).send({error: 'Game not found'});
		}

		res.send(game.getState());
	});
}

export default gameRoutes