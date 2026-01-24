import { GenerateWavyGlitchSvgController } from '@app/controllers/GenerateWavyGlitchSvg';
import { GenerateWavyGlitchSvgUseCase } from '@app/useCases/GenerateWavyGlitchSvgUseCase';

export function makeGenerateWavyGlitchSvgController() {
  const generateWavyGlitchSvgUseCase = new GenerateWavyGlitchSvgUseCase();
  const generateWavyGlitchSvgController = new GenerateWavyGlitchSvgController(
    generateWavyGlitchSvgUseCase,
  );
  return generateWavyGlitchSvgController;
}
