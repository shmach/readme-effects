import { routeAdapter } from './main/adapters/routeAdapter';
import { makeGenerateSvgController } from './main/factories/makeGenerateSvgController';

const server = Bun.serve({
  routes: {
    '/': () => new Response('Hello, World!'),
    '/generate': (req) => routeAdapter(makeGenerateSvgController())(req),
  },
  fetch() {
    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
