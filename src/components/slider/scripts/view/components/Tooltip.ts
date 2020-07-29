import CLASSES from '../classes';
import Point from './Point';

class Tooltip {
  private readonly $tooltip: JQuery;

  private readonly viewName: ViewName;

  constructor($slider: JQuery, viewName: ViewName) {
    this.viewName = viewName;

    this.$tooltip = $('<div>', {
      class: CLASSES.TOOLTIP,
      css: { transform: 'translate(-50%)' },
    });

    $slider.append(this.$tooltip);
  }

  public static updateZIndexes(tooltips: Tooltip[], points: Point[]): void {
    points.forEach((point, index) => {
      tooltips[index]._setZIndex(point.zIndex);
    });
  }

  public setState(position: number, value: string): void {
    this.$tooltip
      .html(value)
      .css(
        this.viewName === 'horizontal' ? 'left' : 'top',
        `${position * 100}%`,
      );
  }

  private _setZIndex(zIndex: number): void {
    this.$tooltip.css('z-index', zIndex);
  }
}

export default Tooltip;
