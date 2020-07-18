// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface JQuery {
  slider(
    this: JQuery,
    command: 'init',
    config?: {
      readonly customScale?: string[];
      readonly min?: number;
      readonly max?: number;
      readonly step?: number;
      readonly tooltips?: boolean;
      readonly bgLine?: boolean;
      readonly start?: string[] | number[];
      readonly viewName?: 'horizontal' | 'vertical';
      readonly prettify?: (value: string | number) => string;
    }
  ): JQuery;

  slider(this: JQuery, command: 'step'): number;
  slider(this: JQuery, command: 'step', step: number): JQuery;

  slider(this: JQuery, command: 'value'): string[] | number[];
  slider(this: JQuery, command: 'value', value: string[] | number[]): JQuery;

  slider(this: JQuery, command: 'show-tooltips' | 'show-bg-line'): boolean;
  slider(
    this: JQuery,
    command: 'show-tooltips' | 'show-bg-line',
    isShow: boolean
  ): JQuery;

  slider(this: JQuery, command: 'view-name'): 'horizontal' | 'vertical';
  slider(
    this: JQuery,
    command: 'view-name',
    name: 'horizontal' | 'vertical'
  ): JQuery;

  slider(this: JQuery, command: 'scale'): [number, number] | string[];
  slider(this: JQuery, command: 'scale', scale: [number, number] | string[]): JQuery;
}
