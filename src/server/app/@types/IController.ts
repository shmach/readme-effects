import type { IHttpRequest, IHttpResponse } from './IHttp';

export interface IController<
  TBody extends Record<string, any> | undefined = undefined,
> {
  handler(request: IHttpRequest<TBody>): Promise<IHttpResponse>;
}

export interface IEventController<T> {
  handler(event: T): Promise<any | T>;
}
