const server = Bun.serve({
  routes: {
    "/": () => new Response("Hello, World!"),
    "/generate": req => {
      return new Response(`Received request at ${new Date().toISOString()}`);
    }
  },
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  }
});

console.log(`Server running at http://localhost:${server.port}`);