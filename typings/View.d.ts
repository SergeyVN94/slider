type SliderViewName = 'horizontal' | 'vertical';
type PrettifyFunc = (value: number | string) => string;
type HandlerSliderViewSelect = (targetPosition: number, pointSelected: number) => void;

interface IDomElements {
  $slider: JQuery;
  points: JQuery[];
  tooltips: JQuery[];
  $pointContainer: JQuery;
  $tooltipContainer: JQuery;
  $bgLine: JQuery;
  $document: JQuery<Document>;
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

interface ISliderViewDriver {
  getTargetPosition($event: JQuery.Event, $pointContainer: JQuery): number;
  setPointPosition($point: JQuery, $pointContainer: JQuery, position: number): void;
  updateTooltip(
    $tooltip: JQuery,
    $tooltipContainer: JQuery,
    position: number,
    value: string
  ): void;
  updateBgLine($bgLine: JQuery, $pointContainer: JQuery, pointPositions: number[]): void;
}
