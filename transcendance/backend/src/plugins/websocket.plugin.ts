import fp from 'fastify-plugin';
import websocketPlugin from '@fastify/websocket';
import { FastifyInstance } from 'fastify';

// Activate WebSocket Plugin to Fastify.
export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(websocketPlugin);
});