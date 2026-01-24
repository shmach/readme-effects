import type { IController } from '../../app/@types/IController';

export function routeAdapter(controller: IController<any>) {
  return async (req: Request): Promise<Response> => {
    try {
      const result = await controller.handler(req);
      return new Response(
        result.body instanceof ReadableStream
          ? result.body
          : JSON.stringify(result.body),
        {
          status: result.statusCode,
          headers: new Headers(result.headers),
        },
      );
    } catch (error) {
      console.error('Error in routeAdapter:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  };
}
