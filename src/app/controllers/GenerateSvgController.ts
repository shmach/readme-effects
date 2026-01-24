import type { IController } from '../@types/IController';
import type { IHttpRequest, IHttpResponse } from '../@types/IHttp';
import type { GenerateSvgUseCase } from '../useCases/GenerateSvgUseCase';

type GenerateSvgControllerRequest = {
  url: string;
};

export class GenerateSvgController implements IController<GenerateSvgControllerRequest> {
  constructor(private generateSvgUseCase: GenerateSvgUseCase) {}

  async handler(
    req: IHttpRequest<GenerateSvgControllerRequest>,
  ): Promise<IHttpResponse> {
    console.log(
      'GenerateSvgController handler called with request:',
      req.query,
    );

    const svg = this.generateSvgUseCase.execute();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'image/svg+xml' },
      body: { svg },
    };
  }
}
