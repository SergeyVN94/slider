import CLASSES from '../classes';

class BgLine {
  private readonly $bgLine: JQuery;

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
    const marginLeft = min * 100;
    const marginRight = 100 - (max * 100);

    this.$bgLine
      .css('right', `${marginRight}%`)
      .css('left', `${marginLeft}%`);
  }

  private _verticalViewUpdate(max: number, min = 0): void {
    const marginBottom = min * 100;
    const marginTop = 100 - (max * 100);

    this.$bgLine
      .css('top', `${marginTop}%`)
      .css('bottom', `${marginBottom}%`);
  }
}

export default BgLine;
