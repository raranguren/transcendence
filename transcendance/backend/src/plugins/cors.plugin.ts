import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import cors from '@fastify/cors';
import fp from 'fastify-plugin';

// cors to implement (Midd)
const corsPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	await fastify.register(cors, {
		origin: "*",
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	})
}

export default fp(corsPlugin);