// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface JQuery {
  slider(
    this: JQuery,
    command: 'init',
    config?: {
      customScale?: string[];
      min?: number;
      max?: number;
      step?: number;
      tooltips?: boolean;
      bgLine?: boolean;
      values?: string[] | number[];
      viewName?: 'horizontal' | 'vertical';
      prettify?: (value: string | number) => string;
    }
  ): JQuery;

  slider(this: JQuery, command: 'step'): number;
  slider(this: JQuery, command: 'step', step: number): JQuery;

  slider(this: JQuery, command: 'values'): string[] | number[];
  slider(this: JQuery, command: 'values', values: string[] | number[]): JQuery;

  slider(this: JQuery, command: 'show-tooltips' | 'show-bg-line'): boolean;
  slider(this: JQuery, command: 'show-tooltips' | 'show-bg-line', isShow: boolean): JQuery;

  slider(this: JQuery, command: 'view-name'): 'horizontal' | 'vertical';
  slider(this: JQuery, command: 'view-name', name: 'horizontal' | 'vertical'): JQuery;

  slider(this: JQuery, command: 'custom-scale'): string[];
  slider(this: JQuery, command: 'custom-scale', scale: string[]): JQuery;

  slider(this: JQuery, command: 'min-max'): [number, number];
  slider(this: JQuery, command: 'min-max', min: number, max: number): JQuery;
}
