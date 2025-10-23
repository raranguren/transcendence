import fp from 'fastify-plugin';
import websocketPlugin from '@fastify/websocket';
import { FastifyInstance } from 'fastify';

/**
 * Plugin qui ajoute le support WebSocket à Fastify.
 */
export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(websocketPlugin);
});