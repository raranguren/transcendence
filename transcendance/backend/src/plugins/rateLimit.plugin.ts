import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import rateLimit from '@fastify/rate-limit'

const rateLimitPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	//Limit the number of request on a route
	await fastify.register(rateLimit, {
	  global: true,
	  max: 100,
	  timeWindow: '1 minute',
	  ban: 1,
	})
	
	//Preventing guessing of URLS through 404s
	fastify.setNotFoundHandler({
	  preHandler: fastify.rateLimit({
		max: 4,
		timeWindow: 500,
	  })
	}, function (request, reply) {
	  reply.code(404).send({error: 'Not Found'})
	})

}

export default fp(rateLimitPlugin)