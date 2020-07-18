import CLASSES from '../classes';

class Point {
  private readonly $point: JQuery;

  private readonly index: number;

  private mousedownCallback: HandlePointMousedown;

  private _setPosition: (position: number) => void;

  constructor($slider: JQuery, index: number, view: ViewName) {
    this.index = index;
    this.$point = $('<div/>', {
      class: `${CLASSES.POINT} js-${CLASSES.POINT}`,
      'data-index': this.index,
    });
    $slider.append(this.$point);
    this._setViewName(view);
  }

  public onMousedown(callback: HandlePointMousedown): void {
    this.mousedownCallback = callback;
    this.$point.on('mousedown', this._handlePointMousedown.bind(this));
  }

  public setPosition(position: number): void {
    this._setPosition(position);
  }

  private _setViewName(name: ViewName): void {
    if (name === 'vertical') {
      this._setPosition = this._verticalViewSetPosition.bind(this);
    } else {
      this._setPosition = this._horizontalViewSetPosition.bind(this);
    }
  }

  private _horizontalViewSetPosition(position: number): void {
    const containerWidth = this.$point.parent().outerWidth();
    const offset = this.$point.outerWidth() / 2;
    const marginLeft = (position * containerWidth) - offset;
    this.$point.css('left', `${marginLeft}px`);
  }

  private _verticalViewSetPosition(position: number): void {
    const containerHeight = this.$point.parent().outerHeight();
    const offset = this.$point.outerHeight() / 2;
    const marginBottom = (position * containerHeight) - offset;
    this.$point.css('bottom', `${marginBottom}px`);
  }

  private _handlePointMousedown(ev: JQuery.MouseDownEvent): void {
    ev.stopPropagation();
    this.mousedownCallback(this.index, ev);
  }
}

export default Point;
