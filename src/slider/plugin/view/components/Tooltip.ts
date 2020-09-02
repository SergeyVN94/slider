import CLASSES from '../classes';
import Point from './Point';

class Tooltip {
  private readonly $tooltip: JQuery;

  private readonly viewName: ViewName;

  constructor($slider: JQuery, viewName: ViewName) {
    this.viewName = viewName;
    this.$tooltip = $('<div>', { class: CLASSES.TOOLTIP });

    $slider.append(this.$tooltip);
  }

  public static updateZIndexes(tooltips: Tooltip[], points: Point[]): void {
    points.forEach((point, index) => {
      tooltips[index].setZIndex(point.zIndex);
    });
  }

  public setState(position: number, value: string): void {
    this.$tooltip.html(value);
    if (this.viewName === 'horizontal') this.$tooltip.css('left', `${position * 100}%`);
    else this.$tooltip.css('top', `${100 - (position * 100)}%`);
  }

  private setZIndex(zIndex: number): void {
    this.$tooltip.css('z-index', zIndex);
  }
}

export default Tooltip;
