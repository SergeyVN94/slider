import { boundMethod } from 'autobind-decorator';

import CLASSES from '../classes';

class Slider {
  public getTargetPosition: (ev: JQuery.MouseEventBase) => number;

  private readonly $slider: JQuery;

  private callbackMousedown: (position: number) => void;

  constructor($slider: JQuery, viewName: ViewName) {
    this.$slider = $slider;
    this.callbackMousedown = null;

    if (viewName === 'vertical') {
      this.$slider.addClass('slider_view-name_vertical');
      this.getTargetPosition = this.getTargetPositionForVerticalView;
    } else {
      this.getTargetPosition = this.getTargetPositionForHorizontalView;
    }

    $slider
      .off('mousedown.slider.click')
      .on('mousedown.slider.click', this.handleMousedown);
  }

  public set areTooltipsVisible(state: boolean) {
    this.$slider.toggleClass(CLASSES.WITHOUT_TOOLTIPS, !state);
  }

  public get areTooltipsVisible(): boolean {
    return !this.$slider.hasClass(CLASSES.WITHOUT_TOOLTIPS);
  }

  public set isBgLineVisible(state: boolean) {
    this.$slider.toggleClass(CLASSES.WITHOUT_BG_LINE, !state);
  }

  public get isBgLineVisible(): boolean {
    return !this.$slider.hasClass(CLASSES.WITHOUT_BG_LINE);
  }

  public triggerPointMoveEvent(values: string[] | number[]): void {
    this.$slider.trigger('point-move', values);
  }

  public onMousedown(callback: (position: number) => void): void {
    this.callbackMousedown = callback;
  }

  public static resetSlider($slider: JQuery): void {
    $slider
      .html('')
      .removeClass()
      .addClass('slider js-slider')
      .off('mousedown.slider.select');
  }

  @boundMethod
  private handleMousedown(ev: JQuery.MouseEventBase): void {
    if (this.callbackMousedown) this.callbackMousedown(this.getTargetPosition(ev));
  }

  @boundMethod
  private getTargetPositionForHorizontalView(ev: JQuery.MouseEventBase): number {
    const absolutePosition = ev.pageX;
    const offset = this.$slider.offset().left;
    const position = (absolutePosition - offset) / this.$slider.outerWidth();

    if (position > 1) return 1;
    if (position < 0) return 0;

    return position;
  }

  @boundMethod
  private getTargetPositionForVerticalView(ev: JQuery.MouseEventBase): number {
    const absolutePosition = ev.pageY;
    const offset = this.$slider.offset().top;
    let position = (absolutePosition - offset) / this.$slider.outerHeight();

    if (position > 1) position = 1;
    if (position < 0) position = 0;

    return 1 - position;
  }
}

export default Slider;
