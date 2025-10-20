import Fastify from 'fastify'
import app from "./app.js"

// Inside of Fastify object you can write configuration for app
const fastify = Fastify({
  logger: true
});

const { ADDRESS = 'localhost', PORT = '8080' } = process.env;

fastify.get('/', (request, reply) => {
	//
})


try{
  const address = fastify.listen({host: ADDRESS, port: parseInt(PORT, 10)});
  console.log(`Server listening at ${address}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}