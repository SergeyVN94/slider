import { PointState } from '../model/types';
import BgLine from './components/BgLine';
import Point from './components/Point';
import Scale from './components/Scale';
import Slider from './components/Slider';
import Tooltip from './components/Tooltip';

export type ViewName = 'horizontal' | 'vertical';
export type PrettifyFunc = (value: number | string) => string;
export type HandlerPointPositionChange = (targetPosition: number, pointIndex?: number) => void;
export type HandlePointMousedown = (index: number, ev: MouseEvent) => void;
export type HandleSliderMousedown = (position: number) => void;

export const VIEW_VERTICAL = 'vertical';
export const VIEW_HORIZONTAL = 'horizontal';

export type ViewInitialConfig = {
  container: HTMLElement;
  pointsCount: number;
  tooltips?: boolean;
  bgLine?: boolean;
  viewName?: ViewName;
  prettify?: (value: number | string) => string;
  scaleItems: PointState[];
};

export type ViewConfig = {
  tooltips: boolean;
  bgLine: boolean;
  viewName: ViewName;
};

export interface IViewComponents {
  slider: Slider;
  points: Point[];
  tooltips: Tooltip[];
  bgLine: BgLine;
  scale: Scale;
}

export interface IView {
  onPointPositionChange(callback: HandlerPointPositionChange): void;
  update(pointsStates: PointState[]): void;
  getConfig(): ViewConfig;
}

export { PointState };
