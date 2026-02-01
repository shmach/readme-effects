import { GenerateTypingSvgController } from '@app/controllers/web/GenerateTypingSvgController';
import { GenerateTypingSvgUseCase } from '@app/useCases/web/GenerateTypingSvgUseCase';

export function makeGenerateTypingSvgController() {
  const generateTypingSvgUseCase = new GenerateTypingSvgUseCase();
  const generateTypingSvgController = new GenerateTypingSvgController(
    generateTypingSvgUseCase,
  );
  return generateTypingSvgController;
}
