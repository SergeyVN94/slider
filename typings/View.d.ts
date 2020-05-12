type SliderViewName = 'horizontal' | 'vertical';
type PrettifyFunc = (value: number | string) => string;
type HandlerSliderViewSelect = (targetPosition: number, pointSelected: number) => void;

interface ISliderComponents {
  $slider: JQuery;
  $tooltipContainer: JQuery;
  $document: JQuery<Document>;
  points: IPoint[];
  tooltips: ITooltip[];
  pointContainer: IPointContainer;
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
}

interface ISliderElement {
  getElement(): JQuery;
}

interface IPoint extends ISliderElement {
  setPosition(position: number): void;
}

interface ITooltip extends ISliderElement {
  setState(position: number, value: string): void;
}

interface IPointContainer extends ISliderElement {
  getSize(): number;
  onClick(callback: (position: number) => void): void;
  getTargetPosition(ev: JQuery.MouseEventBase): number;
}
