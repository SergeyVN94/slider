type SliderViewName = 'horizontal' | 'vertical';
type PrettifyFunc = (value: number | string) => string;
type HandlerSliderViewSelect = (targetPosition: number, pointSelected: number) => void;
type HandlerStepToValueEvent = (step: number) => string;
type HandleScaleItemClickEvent = (position: number) => void;

interface IViewComponents {
  slider: ISlider;
  points: IPoint[];
  tooltips: ITooltip[];
  bgLine: IBgLine;
  scale: IScale;
}

interface IViewCache {
  pointPositions: number[];
  pointValues: string[] | number[];
  stepSize: number;
  maxStep: number;
  stepToValue: HandlerStepToValueEvent;
}

interface ISliderViewConfigManager {
  showTooltips: boolean;
  viewName: 'horizontal' | 'vertical';
  showBgLine: boolean;
}

interface ISliderView {
  onSelect(callback: HandlerSliderViewSelect): void;
  update(pointPositions: number[], pointValues: number[] | string[]): void;
  updateScale(maxStep: number, stepSize: number): void;
  onStepToValue(callback: HandlerStepToValueEvent): void;
}

interface IComponentsFactory {
  createSlider($slider: JQuery): ISlider;
  createPoint(index: number): IPoint;
  createTooltip(): ITooltip;
  createBgLine(): IBgLine;
  createScale($slider: JQuery): IScale;
}

interface ISliderComponent {
  getElement(): JQuery;
  draw($slider: JQuery): void;
}

interface ISlider {
  getElement(): JQuery;
  getTargetPosition(ev: JQuery.MouseEventBase): number;
  showTooltips: boolean;
  showBgLine: boolean;
}

interface IPoint extends ISliderComponent {
  setPosition(position: number): void;
  onMousedown(callback: (index: number, ev: JQuery.MouseDownEvent) => void): void;
}

interface ITooltip extends ISliderComponent {
  setState(position: number, value: string): void;
}

interface IBgLine extends ISliderComponent {
  update(max: number, min?: number): void;
}

interface IScale {
  setMaxStep(maxStep: number): void;
  setStepSize(stepSize: number): void;
  redraw(): void;
  onStepToValue(callback: HandlerStepToValueEvent): void;
  onClick(callback: HandleScaleItemClickEvent): void;
}
