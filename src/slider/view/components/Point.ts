import { HandlePointMousedown, ViewName, VIEW_VERTICAL } from '../types';
import CLASSES from '../classes';

class Point {
  private readonly point: HTMLElement;

  private readonly index: number;

  private mousedownCallback: HandlePointMousedown;

  private readonly viewName: ViewName;

  constructor(index: number, view: ViewName) {
    this.index = index;
    this.viewName = view;
    this.point = document.createElement('div');
    this.init();
  }

  public update(position: number): void {
    if (this.viewName === 'horizontal') this.point.style.left = `${position * 100}%`;
    else this.point.style.top = `${100 - (position * 100)}%`;
  }

  public draw(container: HTMLElement): void {
    container.appendChild(this.point);
  }

  private init(): void {
    this.point.classList.add(CLASSES.POINT);
    this.point.style.zIndex = '20';

    this.handleMousedown = this.handleMousedown.bind(this);
    this.point.addEventListener('mousedown', this.handleMousedown);
  }

  public static handleCollisions(points: Point[], movedPointIndex: number): void {
    const movedPoint = points[movedPointIndex];

    points.forEach((point, index) => {
      if (movedPointIndex !== index && movedPoint.checkCollision(point)) {
        if (movedPoint.zIndex <= point.zIndex) movedPoint.zIndex = point.zIndex + 1;
      }
    });
  }

  public onMousedown(callback: HandlePointMousedown): void {
    this.mousedownCallback = callback;
  }

  public get zIndex(): number {
    return parseInt(this.point.style.zIndex, 10);
  }

  public set zIndex(value: number) {
    this.point.style.zIndex = value.toString();
  }

  private checkCollision(point: Point): boolean {
    const pointSize = this.viewName === VIEW_VERTICAL
      ? this.point.offsetHeight
      : this.point.offsetWidth;

    const position = this.getPosition();
    const anotherPointPosition = point.getPosition();

    return Math.abs(position - anotherPointPosition) < pointSize;
  }

  private getPosition(): number {
    if (this.viewName === VIEW_VERTICAL) {
      return (this.point.offsetHeight / 2) + this.point.offsetTop;
    }

    return (this.point.offsetWidth / 2) + this.point.offsetLeft;
  }

  private handleMousedown(ev: MouseEvent): void {
    ev.stopPropagation();
    if (this.mousedownCallback) this.mousedownCallback(this.index, ev);
  }
}

export default Point;
