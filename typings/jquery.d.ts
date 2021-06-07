// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface JQuery {
  slider(
    this: JQuery,
    command: 'init',
    config?: {
      min?: number;
      max?: number;
      step?: number;
      orientation?: 'horizontal' | 'vertical';
      withScale?: number;
      withTooltips?: boolean;
      withBackgroundLine?: boolean;
      prettifyTooltip?: (value: number) => string;
      prettifyScaleItem?: (value: number) => string;
    }
  ): JQuery;

  slider(this: JQuery, command: 'config'): ({
    min: number;
    max: number;
    step: number;
    orientation: 'horizontal' | 'vertical';
    withScale: number;
    withTooltips: boolean;
    withBackgroundLine: boolean;
    prettifyTooltip: ((value: number) => string) | null;
    prettifyScaleItem: ((value: number) => string) | null;
  });

  slider(this: JQuery, command: 'values', values: number[]): number[];
}
