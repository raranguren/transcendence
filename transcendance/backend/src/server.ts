import Fastify from 'fastify'
import type { FastifyInstance } from 'fastify'
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"
import cors from "@fastify/cors"
import AutoLoad from "@fastify/autoload"
import { join } from "desm"
import fs from 'fs'
import db from './database/db.ts'
import { getErrorsStatusCode } from './errors.ts'


const httpsOptions = {
  key: fs.readFileSync('/etc/certificates/server.key'),
  cert: fs.readFileSync('/etc/certificates/server.crt'),
};

// Inside of Fastify object you can write configuration for app
const fastifyInstance: FastifyInstance = Fastify({
  logger: true,
  https: httpsOptions,
});

const { ADDRESS = 'localhost', PORT = '8080' } = process.env;

///TO DO: delete for correction
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

await fastifyInstance.register(fastifySwagger, swaggerOptions);
await fastifyInstance.register(fastifySwaggerUI, swaggerUIOptions);

// Make sure the database is flushed when closing
fastifyInstance.addHook('onClose', (_, done) => {
  db.close();
  done();
});

// Error handler
fastifyInstance.setErrorHandler((err, request, reply) => {
  const error = err.message;
  const status = getErrorsStatusCode(error);
  if (status >= 500) request.log.error(err);
  return reply.status(status).send({ error });
});


///////////////////////////////////
// cors to implement
await fastifyInstance.register(cors, {
	origin: "*",
});

await fastifyInstance.register(AutoLoad, {
  dir: join(import.meta.url, "modules"),
  dirNameRoutePrefix: false
});

try {
  const address = await fastifyInstance.listen({host: ADDRESS, port: Number(PORT)});
  console.log(`Server listening at ${address}`);
} catch (err) {
  fastifyInstance.log.error(err);
  process.exit(1);
}