import Fastify from 'fastify'
import type { FastifyInstance } from 'fastify'
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"
import AutoLoad from "@fastify/autoload"
import { join } from "desm"
import fs from 'fs'
import DAC from './database/dac.ts'


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
  DAC.close();
  done();
});

// Health check endpoint
fastifyInstance.get('/health', async (_, reply) => {
  const result = await DAC.health();
  if (result.status == 'error')
    reply.status(503);
  return result;
});

// TODO graceful shutdown database

///////////////////////////////////

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