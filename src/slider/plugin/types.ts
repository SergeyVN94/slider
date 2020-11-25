import { PrettifyFunc, ViewName } from '../view/types';

export type Command = 'init' | 'values' | 'config';

export const COMMANDS = {
  INIT: 'init',
  CONFIG: 'config',
};

export type SliderConfig = {
  step?: number;
  viewName?: ViewName;
  tooltips?: boolean;
  bgLine?: boolean;
  min?: number;
  max?: number;
  customScale?: string[];
  values?: number[] | string[];
  prettify?: (value: number | string) => string;
}

export type NormalizedConfig = ({
  viewName: ViewName;
  tooltips: boolean;
  step: number;
  bgLine: boolean;
  prettify?: PrettifyFunc;
}) & ({
  values: string[];
  customScale: string[];
} | {
  min: number;
  max: number;
  values: number[];
});
