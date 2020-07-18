import CLASSES from '../classes';

class BgLine {
  private readonly $bgLine: JQuery;

  private _update: (max: number, min?: number) => void;

  constructor($slider: JQuery, viewName: ViewName) {
    this.$bgLine = $('<div/>', {
      class: `${CLASSES.BG_LINE} js-${CLASSES.BG_LINE}`,
    });
    $slider.append(this.$bgLine);
    this._setViewName(viewName);
  }

  public update(max: number, min = 0): void {
    this._update(max, min);
  }

  public _setViewName(name: ViewName): void {
    if (name === 'vertical') {
      this._update = this._verticalViewUpdate.bind(this);
    } else {
      this._update = this._horizontalViewUpdate.bind(this);
    }
  }

  private _horizontalViewUpdate(max: number, min = 0): void {
    this.$bgLine
      .css('right', `${100 - (max * 100)}%`)
      .css('left', `${min * 100}%`);
  }

  private _verticalViewUpdate(max: number, min = 0): void {
    this.$bgLine
      .css('top', `${100 - (max * 100)}%`)
      .css('bottom', `${min * 100}%`);
  }
}

export default BgLine;
