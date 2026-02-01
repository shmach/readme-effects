import { GenerateWavyGlitchSvgController } from '@app/controllers/web/GenerateWavyGlitchSvgController';
import { GenerateWavyGlitchSvgUseCase } from '@app/useCases/web/GenerateWavyGlitchSvgUseCase';

export function makeGenerateWavyGlitchSvgController() {
  const generateWavyGlitchSvgUseCase = new GenerateWavyGlitchSvgUseCase();
  const generateWavyGlitchSvgController = new GenerateWavyGlitchSvgController(
    generateWavyGlitchSvgUseCase,
  );
  return generateWavyGlitchSvgController;
}
