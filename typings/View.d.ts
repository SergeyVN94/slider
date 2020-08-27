type ViewName = 'horizontal' | 'vertical';
type PrettifyFunc = (value: number | string) => string;
type HandlerPointPositionChange = (targetPosition: number, pointIndex?: number) => void;
type HandlePointMousedown = (index: number, ev: JQuery.MouseDownEvent) => void;

interface IViewConfigManager {
  areTooltipsVisible: boolean;
  isBgLineVisible: boolean;
}

interface IView {
  onPointPositionChange(callback: HandlerPointPositionChange): void;
  update(pointsPositions: number[], pointValues: number[] | string[]): void;
}
