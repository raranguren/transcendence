import Fastify from 'fastify'
import fs from 'fs'
import path from 'path'

// Inside of Fastify object you can write configuration for app
const fastify = Fastify({
  logger: true
});

const { ADDRESS = 'localhost', PORT = '8080' } = process.env;

fastify.get('/', async function handler (request, reply) {
  const filePath = 'pong.html';
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	return reply.type('text/html').send(fileContent);
})

// fastify.route({
//   method: "GET",
//   url: "/",
//   handler: (request, reply) => {
//     return { message: 'hello world !'}
//   }
// });

try{
  const address = await fastify.listen({host: ADDRESS, port: parseInt(PORT, 10)});
  console.log(`Server listening at ${address}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

