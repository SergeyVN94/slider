type SliderViewName = 'horizontal' | 'vertical';
type PrettifyFunc = (value: number | string) => string;
type HandlerSliderViewSelect = (targetPosition: number, pointSelected: number) => void;
type HandlerStepToValueEvent = (step: number) => string;
type HandleScaleItemClickEvent = (position: number) => void;
type HandlePointMousedown = (index: number, ev: JQuery.MouseDownEvent) => void;

interface IViewCache {
  pointPositions: number[];
  pointValues: string[] | number[];
  stepSize: number;
  maxStep: number;
  stepToValue: HandlerStepToValueEvent;
}

interface ISliderViewConfigManager {
  showTooltips: boolean;
  viewName: SliderViewName;
  showBgLine: boolean;
}

interface ISliderView {
  onSelect(callback: HandlerSliderViewSelect): void;
  update(pointPositions: number[], pointValues: number[] | string[]): void;
  updateScale(maxStep: number, stepSize: number): void;
  onStepToValue(callback: HandlerStepToValueEvent): void;
}
