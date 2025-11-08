import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import helmet from '@fastify/helmet'

const helmetPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.register(helmet, {
	global: true,
  })
}

export default fp(helmetPlugin)