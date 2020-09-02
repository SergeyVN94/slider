import { boundMethod } from 'autobind-decorator';

import CLASSES from '../classes';

class BgLine {
  public update: (max: number, min?: number) => void;

  private readonly $bgLine: JQuery;

  constructor($slider: JQuery, viewName: ViewName) {
    this.$bgLine = $('<div/>', {
      class: `${CLASSES.BG_LINE} js-${CLASSES.BG_LINE}`,
    });
    $slider.append(this.$bgLine);

    this.update = viewName === 'vertical'
      ? this.updateForVerticalView
      : this.updateForHorizontalView;
  }

  @boundMethod
  private updateForHorizontalView(max: number, min = 0): void {
    this.$bgLine
      .css('right', `${100 - (max * 100)}%`)
      .css('left', `${min * 100}%`);
  }

  @boundMethod
  private updateForVerticalView(max: number, min = 0): void {
    this.$bgLine
      .css('top', `${100 - (max * 100)}%`)
      .css('bottom', `${min * 100}%`);
  }
}

export default BgLine;
