import fp from 'fastify-plugin';
import websocketPlugin from '@fastify/websocket';
import type { FastifyInstance } from 'fastify';

// Activate WebSocket Plugin to Fastify.
fp(async function (fastify: FastifyInstance) {
  await fastify.register(websocketPlugin);
});

export default fp