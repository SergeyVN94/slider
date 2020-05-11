type SliderViewName = 'horizontal' | 'vertical';
type PrettifyFunc = (value: number | string) => string;
type HandlerSliderViewSelect = (targetPosition: number, pointSelected: number) => void;

interface ISliderComponents {
  $slider: JQuery;
  $document: JQuery<Document>;
  points: IPoint[];
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
}

interface ISliderElement {
  getElement(): JQuery;
}

interface IPoint extends ISliderElement {
  setPosition(position: number): void;
}

interface IPointContainer extends ISliderElement {
  getSize(): number;
}
