import type { IController } from '../../app/@types/IController';

export function routeAdapter(controller: IController<any>) {
  return async (req: Request): Promise<Response> => {
    try {
      const result = await controller.handler({
        query: req.url ? { url: req.url } : {},
        body: await req.json().catch(() => ({})),
        headers: Object.fromEntries(req.headers),
      });
      const body =
        result.body && typeof result.body === 'object' && 'svg' in result.body
          ? result.body.svg
          : JSON.stringify(result.body);
      return new Response(body, {
        status: result.statusCode,
        headers: new Headers(result.headers),
      });
    } catch (error) {
      console.error('Error in routeAdapter:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  };
}
