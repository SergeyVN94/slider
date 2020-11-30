// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface JQuery {
  slider(
    this: JQuery,
    command: 'init',
    config?: {
      min?: number;
      max?: number;
      values?: number[];
      step?: number;
      viewName?: 'horizontal' | 'vertical';
      tooltips?: boolean;
      bgLine?: boolean;
      prettify?: (value: number) => string;
    }
  ): JQuery;

  slider(
    this: JQuery,
    command: 'init',
    config?: {
      customScale?: string[];
      values?: string[];
      step?: number;
      viewName?: 'horizontal' | 'vertical';
      tooltips?: boolean;
      bgLine?: boolean;
      prettify?: (value: string) => string;
    }
  ): JQuery;

  slider(this: JQuery, command: 'config'): ({
    viewName: 'horizontal' | 'vertical';
    tooltips: boolean;
    bgLine: boolean;
    step: number;
  } & (
    {
      values: string[];
      customScale: string[];
    } | {
      min: number;
      max: number;
      values: number[];
    }
  ));

  slider(this: JQuery, command: 'config', config: {
    values?: string[] | number[];
    customScale?: string[];
    min?: number;
    max?: number;
    viewName?: 'horizontal' | 'vertical';
    tooltips?: boolean;
    step?: number;
    bgLine?: boolean;
  }): JQuery;
}
