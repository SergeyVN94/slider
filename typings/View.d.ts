type SliderViewName = 'horizontal' | 'vertical';
type PrettifyFunc = (value: number | string) => string;
type HandlerSliderViewSelect = (targetPosition: number, pointSelected: number) => void;

interface IViewComponents {
  $slider: JQuery;
  $tooltipContainer: JQuery;
  $document: JQuery<Document>;
  points: IPoint[];
  tooltips: ITooltip[];
  pointContainer: IPointContainer;
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
  createPointContainer(): IPointContainer;
  createPoint(index: number, pointContainer: IPointContainer): IPoint;
  createTooltip($tooltipContainer: JQuery): ITooltip;
  createBgLine(pointContainer: IPointContainer): IBgLine;
}

interface ISliderComponent {
  getElement(): JQuery;
}

interface IPoint extends ISliderComponent {
  setPosition(position: number): void;
  onMousedown(callback: (index: number) => void): void;
}

interface ITooltip extends ISliderComponent {
  setState(position: number, value: string): void;
}

interface IBgLine extends ISliderComponent {
  update(max: number, min?: number): void;
}

interface IPointContainer extends ISliderComponent {
  getSize(): number;
  onClick(callback: (position: number) => void): void;
  getTargetPosition(ev: JQuery.MouseEventBase): number;
}
