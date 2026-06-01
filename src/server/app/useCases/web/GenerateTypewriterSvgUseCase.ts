import { escapeXML } from '@app/helpers/escapeXML';
import { extractDataFromUrl } from '@app/helpers/extractDataFromUrl';
import type { IUseCase } from '../../@types/IUseCase';

type GenerateTypewriterSvgUseCaseParams = {
  url: string;
};

export class GenerateTypewriterSvgUseCase implements IUseCase<
  GenerateTypewriterSvgUseCaseParams,
  string
> {
  async execute(params: GenerateTypewriterSvgUseCaseParams): Promise<string> {
    const { size, font, pColor, sColor, bgColor, width, height } =
      extractDataFromUrl(params.url);

    const url = new URL(params.url);
    const rawText = url.searchParams.get('text') ?? 'Hello World!';
    const lines = rawText.split(';').map((line) => [...line].map(escapeXML));

    const charDelay = 0.07;
    const pauseAfter = 1.0;
    const blinkHalf = 0.4;

    // Calculate the start/end time for each line within one full cycle
    const lineTimings: Array<{ start: number; end: number }> = [];
    let cumTime = 0;
    for (const chars of lines) {
      const start = cumTime;
      cumTime += chars.length * charDelay + pauseAfter;
      lineTimings.push({ start, end: cumTime });
    }
    const totalDuration = cumTime;
    const dur = `${totalDuration.toFixed(2)}s`;

    const centerY = (height / 2).toFixed(1);

    const textElements = lines
      .map((chars, lineIndex) => {
        const { start: lineStart, end: lineEnd } = lineTimings[lineIndex];

        // Cap lineEnd slightly before totalDuration on the last line to avoid
        // duplicate keyTime=1 while still getting a clean reset at loop start.
        const lineEndCapped = Math.min(lineEnd, totalDuration - 0.001);
        const t1 = lineEndCapped / totalDuration;

        const charSpans = chars
          .map((char, charIndex) => {
            const tBegin = lineStart + charIndex * charDelay;
            const t0 = tBegin / totalDuration;

            let keyTimes: string;
            let values: string;

            if (t0 < 1e-5) {
              // Char starts at the very beginning of the cycle
              keyTimes = `0;${t1.toFixed(5)};1`;
              values = `1;0;0`;
            } else {
              const safeT0 = Math.min(t0, t1 - 1e-5);
              keyTimes = `0;${safeT0.toFixed(5)};${t1.toFixed(5)};1`;
              values = `0;1;0;0`;
            }

            return `<tspan opacity="0"><animate attributeName="opacity" values="${values}" keyTimes="${keyTimes}" calcMode="discrete" dur="${dur}" repeatCount="indefinite"/>${char}</tspan>`;
          })
          .join('');

        // Cursor: blinks during the pause period then disappears with the line
        const cursorStart = lineStart + chars.length * charDelay;
        const ktArr: number[] = [0];
        const vArr: number[] = [0];

        if (cursorStart > 1e-3) {
          ktArr.push(cursorStart);
          vArr.push(0);
        }

        let bt = cursorStart;
        let vis = true;
        while (bt < lineEndCapped - 1e-6) {
          if (bt > ktArr[ktArr.length - 1] + 1e-6) {
            ktArr.push(bt);
            vArr.push(vis ? 1 : 0);
          }
          bt += blinkHalf;
          vis = !vis;
        }

        if (lineEndCapped > ktArr[ktArr.length - 1] + 1e-6) {
          ktArr.push(lineEndCapped);
          vArr.push(0);
        }

        if (totalDuration > ktArr[ktArr.length - 1] + 1e-6) {
          ktArr.push(totalDuration);
          vArr.push(0);
        }

        // Normalize to [0, 1] and force last value to exactly 1
        const ktNorm = ktArr.map((t, i) =>
          i === ktArr.length - 1 ? 1 : t / totalDuration,
        );
        const cursorKT = ktNorm.map((t) => t.toFixed(5)).join(';');
        const cursorV = vArr.join(';');

        const cursorSpan = `<tspan fill="#${sColor}" opacity="0"><animate attributeName="opacity" values="${cursorV}" keyTimes="${cursorKT}" calcMode="discrete" dur="${dur}" repeatCount="indefinite"/>|</tspan>`;

        return `  <text x="50%" y="${centerY}" dominant-baseline="middle" text-anchor="middle" font-family="${font}" font-size="${size}" fill="#${pColor}">${charSpans}${cursorSpan}</text>`;
      })
      .join('\n');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bgColor}"/>
${textElements}
</svg>`.trim();
  }
}
