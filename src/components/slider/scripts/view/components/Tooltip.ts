import CLASSES from '../classes';

class Tooltip {
  private readonly $tooltip: JQuery;

  private _setState: (position: number, value: string) => void;

  constructor($slider: JQuery, viewName: SliderViewName) {
    this.$tooltip = $('<div>', {
      class: CLASSES.TOOLTIP,
    });
    $slider.append(this.$tooltip);
    this.setViewName(viewName);
  }

  public setViewName(name: SliderViewName): void {
    if (name === 'vertical') {
      this._setState = this._verticalViewSetState.bind(this);
    } else {
      this._setState = this._horizontalViewSetState.bind(this);
    }
  }

  public setState(position: number, value: string): void {
    this._setState(position, value);
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
