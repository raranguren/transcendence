import { buildApp } from './app.ts'

const app = await buildApp()

const { ADDRESS = 'localhost', PORT = '8080' } = process.env;

try {
  await app.listen({ host: ADDRESS, port: Number(PORT) });
  console.log(`Server listening at ${ADDRESS}:${PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
