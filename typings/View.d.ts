type ViewName = 'horizontal' | 'vertical';
type PrettifyFunc = (value: number | string) => string;
type HandlerThumbPositionChange = (targetPosition: number, pointSelected: number) => void;
type HandlePointMousedown = (index: number, ev: JQuery.MouseDownEvent) => void;

interface IViewConfigManager {
  areTooltipsVisible: boolean;
  isBgLineVisible: boolean;
}

interface IView {
  onThumbPositionChange(callback: HandlerThumbPositionChange): void;
  update(pointPositions: number[], pointValues: number[] | string[]): void;
}
