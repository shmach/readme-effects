import { GenerateSvgController } from '../../app/controllers/GenerateSvgController';
import { GenerateSvgUseCase } from '../../app/useCases/GenerateSvgUseCase';

export function makeGenerateSvgController() {
  const generateSvgUseCase = new GenerateSvgUseCase();
  const generateSvgController = new GenerateSvgController(generateSvgUseCase);
  return generateSvgController;
}
