import { GenerateTypewriterSvgController } from '@app/controllers/web/GenerateTypewriterSvgController';
import { GenerateTypewriterSvgUseCase } from '@app/useCases/web/GenerateTypewriterSvgUseCase';

export function makeGenerateTypewriterSvgController() {
  const generateTypewriterSvgUseCase = new GenerateTypewriterSvgUseCase();
  const generateTypewriterSvgController = new GenerateTypewriterSvgController(
    generateTypewriterSvgUseCase,
  );
  return generateTypewriterSvgController;
}
