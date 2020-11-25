import { HandlePointMousedown, HandlePointMouseup, ViewName } from '../types';
import CLASSES from '../classes';

class Point {
  private readonly point: HTMLElement;

  private readonly index: number;

  private mousedownCallback: HandlePointMousedown;

  private mouseupCallback: HandlePointMousedown;

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
    this.point.dataset.index = this.index.toString();

    this.point.addEventListener('mousedown', this.handleMousedown.bind(this));
  }

  // public static handleCollisions(points: Point[], selectedPoint: number): void {
  //   if (points.length) {
  //     const movedPoint = points[selectedPoint];

  //     points.forEach((point, index) => {
  //       if (selectedPoint !== index && movedPoint.checkCollision(point)) {
  //         if (movedPoint.zIndex <= point.zIndex) movedPoint.zIndex = point.zIndex + 1;
  //       }
  //     });
  //   }
  // }

  public onMousedown(callback: HandlePointMousedown): void {
    this.mousedownCallback = callback;
  }

  // public get zIndex(): number {
  //   return parseInt(this.$point.css('z-index') || '0', 10);
  // }

  // public set zIndex(index: number) {
  //   this.$point.css('z-index', index);
  // }

  // private checkCollision(point: Point): boolean {
  //   const pointSize = (
  //     this.viewName === 'horizontal' ? this.$point.outerWidth() : this.$point.outerHeight()
  //   );

  //   const position = this.getPosition();
  //   const anotherPosition = point.getPosition();

  //   return Math.abs(position - anotherPosition) < pointSize;
  // }

  // private getPosition(): number {
  //   return parseFloat(
  //     this.$point.css(this.viewName === 'horizontal' ? 'left' : 'top'),
  //   );
  // }

  private handleMousedown(ev: MouseEvent): void {
    ev.stopPropagation();
    if (this.mousedownCallback) this.mousedownCallback(this.index, ev);
  }
}

export default Point;
