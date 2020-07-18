import CLASSES from '../classes';

class Tooltip {
  private readonly $tooltip: JQuery;

  private _setState: (position: number, value: string) => void;

  constructor($slider: JQuery, viewName: ViewName) {
    this.$tooltip = $('<div>', {
      class: CLASSES.TOOLTIP,
    });
    $slider.append(this.$tooltip);
    this._setViewName(viewName);
  }

  public setState(position: number, value: string): void {
    this._setState(position, value);
  }

  private _setViewName(name: ViewName): void {
    if (name === 'vertical') {
      this._setState = this._verticalViewSetState.bind(this);
    } else {
      this._setState = this._horizontalViewSetState.bind(this);
    }
  }

  private _horizontalViewSetState(position: number, value: string): void {
    this.$tooltip.html(value);
    const offset = this.$tooltip.outerWidth() / 2;
    const containerSize = this.$tooltip.parent().outerWidth();
    const marginLeft = ((position * containerSize) - offset);

    this.$tooltip.css('left', `${marginLeft}px`);
  }

  private _verticalViewSetState(position: number, value: string): void {
    this.$tooltip.html(value);
    const offset = this.$tooltip.outerHeight() / 2;
    const containerSize = this.$tooltip.parent().outerHeight();
    const marginBottom = ((position * containerSize) - offset);

    this.$tooltip.css('bottom', `${marginBottom}px`);
  }
}

export default Tooltip;
