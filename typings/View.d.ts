type ViewName = 'horizontal' | 'vertical';
type PrettifyFunc = (value: number | string) => string;
type HandlerPointPositionChange = (targetPosition: number, pointSelected: number) => void;
type HandlePointMousedown = (index: number, ev: JQuery.MouseDownEvent) => void;

interface IViewConfigManager {
  areTooltipsVisible: boolean;
  isBgLineVisible: boolean;
}

interface IView {
  onPointPositionChange(callback: HandlerPointPositionChange): void;
  update(pointPositions: number[], pointValues: number[] | string[]): void;
}
