type ViewName = 'horizontal' | 'vertical';
type PrettifyFunc = (value: number | string) => string;
type HandlerViewSelect = (targetPosition: number, pointSelected: number) => void;
type HandlePointMousedown = (index: number, ev: JQuery.MouseDownEvent) => void;

interface IViewConfigManager {
  areTooltipsVisible: boolean;
  areBgLineVisible: boolean;
}

interface IView {
  onSelect(callback: HandlerViewSelect): void;
  update(pointPositions: number[], pointValues: number[] | string[]): void;
}
