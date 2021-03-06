import { boundMethod } from 'autobind-decorator';

import CLASSES from '../classes';

class Point {
  private readonly $point: JQuery;

  private readonly index: number;

  private mousedownCallback: HandlePointMousedown;

  private readonly viewName: ViewName;

  constructor($slider: JQuery, index: number, view: ViewName) {
    this.index = index;
    this.viewName = view;

    this.$point = $('<div/>', {
      class: `${CLASSES.POINT} js-${CLASSES.POINT}`,
      'data-index': this.index,
    });

    $slider.append(this.$point);
  }

  public static handleCollisions(points: Point[], selectedPoint: number): void {
    if (points.length) {
      const movedPoint = points[selectedPoint];

      points.forEach((point, index) => {
        if (selectedPoint !== index && movedPoint.checkCollision(point)) {
          if (movedPoint.zIndex <= point.zIndex) movedPoint.zIndex = point.zIndex + 1;
        }
      });
    }
  }

  public onMousedown(callback: HandlePointMousedown): void {
    this.mousedownCallback = callback;
    this.$point.on('mousedown', this.handleMousedown);
  }

  public setPosition(position: number): void {
    if (this.viewName === 'horizontal') this.$point.css('left', `${position * 100}%`);
    else this.$point.css('top', `${100 - (position * 100)}%`);
  }

  public get zIndex(): number {
    return parseInt(this.$point.css('z-index') || '0', 10);
  }

  public set zIndex(index: number) {
    this.$point.css('z-index', index);
  }

  private checkCollision(point: Point): boolean {
    const pointSize = (
      this.viewName === 'horizontal' ? this.$point.outerWidth() : this.$point.outerHeight()
    );

    const position = this.getPosition();
    const anotherPosition = point.getPosition();

    return Math.abs(position - anotherPosition) < pointSize;
  }

  private getPosition(): number {
    return parseFloat(
      this.$point.css(this.viewName === 'horizontal' ? 'left' : 'top'),
    );
  }

  @boundMethod
  private handleMousedown(ev: JQuery.MouseDownEvent): void {
    ev.stopPropagation();
    this.mousedownCallback(this.index, ev);
  }
}

export default Point;
