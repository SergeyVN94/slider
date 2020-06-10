import CLASSES from '../classes';

class BgLine {
  protected readonly $bgLine: JQuery;

  private _update: (max: number, min?: number) => void;

  constructor($slider: JQuery, viewName: SliderViewName) {
    this.$bgLine = $('<div/>', {
      class: `${CLASSES.BG_LINE} js-${CLASSES.BG_LINE}`,
    });
    $slider.append(this.$bgLine);
    this.setViewName(viewName);
  }

  public setViewName(name: SliderViewName): void {
    if (name === 'vertical') {
      this._update = this._verticalViewUpdate.bind(this);
    } else {
      this._update = this._horizontalViewUpdate.bind(this);
    }
  }

  public update(max: number, min = 0): void {
    this._update(max, min);
  }

  private _horizontalViewUpdate(max: number, min = 0): void {
    const containerWidth = this.$bgLine.parent().outerWidth();
    const marginLeft = min * containerWidth;
    const marginRight = containerWidth - (max * containerWidth);

    this.$bgLine
      .css('right', `${marginRight}px`)
      .css('left', `${marginLeft}px`);
  }

  private _verticalViewUpdate(max: number, min = 0): void {
    const containerHeight = this.$bgLine.parent().outerHeight();
    const marginBottom = min * containerHeight;
    const marginTop = containerHeight - (max * containerHeight);

    this.$bgLine
      .css('top', `${marginTop}px`)
      .css('bottom', `${marginBottom}px`);
  }
}

export default BgLine;
