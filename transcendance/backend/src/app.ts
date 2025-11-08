import Fastify from 'fastify'
import fs from 'fs'
import { join } from "desm"
import AutoLoad from "@fastify/autoload"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"
import helmet from './plugins/helmet.plugin.ts'
import rateLimit from './plugins/rateLimit.plugin.ts'
import cors from './plugins/cors.plugin.ts'
import db from './database/db.ts'
import { getErrorsStatusCode } from './utils/errors.utils.ts'
import jwt from '@fastify/jwt'
import { getSecret } from './vault/vault.secrets.ts'

const httpsOptions = {
  key: fs.readFileSync('/etc/certificates/server.key'),
  cert: fs.readFileSync('/etc/certificates/server.crt'),
};

const swaggerOptions = {
  swagger: {
	info: {
		title: "Transcendance",
		 description: "",
		 version: "1.0"
	},
	// host: "localhost:8000",
	schemes: ["http", "https"],
	consumes: ["application/json"],
	produces: ["application/json"]
	}
};
	
const swaggerUIOptions = {
  routePrefix: "/docs",
  exposeRoute: true
};


async function buildApp() {
	const fastify = Fastify({
		logger: true,
		https: httpsOptions,
	});
	
	//Register Middlewares
	await fastify.register(helmet)
	await fastify.register(rateLimit)
	await fastify.register(cors)

	//////////TODO: delete for correction//////////////////////////////
	await fastify.register(fastifySwagger, swaggerOptions);
	await fastify.register(fastifySwaggerUI, swaggerUIOptions);
	////////////////////////////////////////////////////////////////////

	// Make sure the database is flushed when closing
	fastify.addHook('onClose', (_, done) => {
		db.close();
		done();
	});

	// Error handler
	fastify.setErrorHandler((err, request, reply) => {
		const error = err.message;
		const status = getErrorsStatusCode(error);
		if (status >= 500) request.log.error(err);
			return reply.status(status).send({ error });
	});


	await fastify.register(jwt, {
	secret: await getSecret("secret/data/backend", "JWT_SECRET")
	})

	//Register all routes from /modules
	await fastify.register(AutoLoad, {
		dir: join(import.meta.url, "modules"),
		dirNameRoutePrefix: false
	});

	return fastify;
}

export { buildApp }