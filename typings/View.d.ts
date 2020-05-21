type SliderViewName = 'horizontal' | 'vertical';
type PrettifyFunc = (value: number | string) => string;
type HandlerSliderViewSelect = (targetPosition: number, pointSelected: number) => void;

interface IViewComponents {
  slider: ISlider;
  points: IPoint[];
  tooltips: ITooltip[];
  bgLine: IBgLine;
}

interface IViewCache {
  pointPositions: number[];
  pointValues: string[] | number[];
}

interface ISliderViewConfigManager {
  showTooltips: boolean;
  viewName: 'horizontal' | 'vertical';
  showBgLine: boolean;
}

interface ISliderView {
  onSelect(callback: HandlerSliderViewSelect): void;
  update(pointPositions: number[], pointValues: number[] | string[]): void;
}

interface IComponentsFactory {
  createSlider($slider: JQuery): ISlider;
  createPoint(index: number): IPoint;
  createTooltip(): ITooltip;
  createBgLine(): IBgLine;
}

interface ISliderComponent {
  getElement(): JQuery;
}

interface ISlider extends ISliderComponent {
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
