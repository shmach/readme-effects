export function routeAdapter(controller: any) {
  return async (req: Request): Promise<Response> => {
    try {
      const result = await controller.handler(req);
      return new Response(result.body, {
        status: result.status,
        headers: new Headers(result.headers),
      });
    } catch (error) {
      console.error('Error in routeAdapter:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  };
}
