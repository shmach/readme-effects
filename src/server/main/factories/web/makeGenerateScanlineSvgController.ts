import { GenerateScanlineSvgController } from '@app/controllers/web/GenerateScanlineSvgController';
import { GenerateScanlineSvgUseCase } from '@app/useCases/web/GenerateScanlineSvgUseCase';

export function makeGenerateScanlineSvgController() {
  const generateScanlineSvgUseCase = new GenerateScanlineSvgUseCase();
  const generateScanlineSvgController = new GenerateScanlineSvgController(
    generateScanlineSvgUseCase,
  );
  return generateScanlineSvgController;
}
