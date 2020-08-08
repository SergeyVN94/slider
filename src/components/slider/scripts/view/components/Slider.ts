import CLASSES from '../classes';

class Slider {
  private readonly $slider: JQuery;

  private _getTargetPosition: (ev: JQuery.MouseEventBase) => number;

  private _callbackMousedown: (position: number) => void;

  constructor($slider: JQuery, viewName: ViewName) {
    this.$slider = $slider;
    this._callbackMousedown = null;

    if (viewName === 'vertical') {
      this.$slider.addClass('slider_view-name_vertical');
      this._getTargetPosition = this._getTargetPositionForVerticalView.bind(this);
    } else {
      this._getTargetPosition = this._getTargetPositionForHorizontalView.bind(this);
    }

    $slider.on('mousedown.slider.click', this._handleSliderMousedown.bind(this));
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

  public triggerThumbMoveEvent(values: string[] | number[]): void {
    this.$slider.trigger('thumb-move', values);
  }

  public getTargetPosition(ev: JQuery.MouseEventBase): number {
    return this._getTargetPosition(ev);
  }

  public onMousedown(callback: (position: number) => void): void {
    this._callbackMousedown = callback;
  }

  public static resetSlider($slider: JQuery): void {
    $slider
      .html('')
      .removeClass()
      .addClass('slider js-slider')
      .off('mousedown.slider.select');
  }

  private _handleSliderMousedown(ev: JQuery.MouseEventBase): void {
    if (this._callbackMousedown) this._callbackMousedown(this.getTargetPosition(ev));
  }

  private _getTargetPositionForHorizontalView(ev: JQuery.MouseEventBase): number {
    const absolutePosition = ev.pageX;
    const offset = this.$slider.offset().left;
    const position = (absolutePosition - offset) / this.$slider.outerWidth();

    if (position > 1) return 1;
    if (position < 0) return 0;

    return position;
  }

  private _getTargetPositionForVerticalView(ev: JQuery.MouseEventBase): number {
    const absolutePosition = ev.pageY;
    const offset = this.$slider.offset().top;
    let position = (absolutePosition - offset) / this.$slider.outerHeight();

    if (position > 1) position = 1;
    if (position < 0) position = 0;

    return 1 - position;
  }
}

export default Slider;
