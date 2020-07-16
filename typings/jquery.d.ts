// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface JQuery {
  slider(
    this: JQuery,
    command: 'init',
    config?: {
      readonly start?: string[] | number[];
      readonly customScale?: string[];
      readonly min?: number;
      readonly max?: number;
      readonly viewName?: 'horizontal' | 'vertical';
      readonly showTooltips?: boolean;
      readonly step?: number;
      readonly prettify?: (value: string | number) => string;
      readonly showBgLine?: boolean;
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
