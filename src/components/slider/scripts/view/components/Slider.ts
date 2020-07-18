import CLASSES from '../classes';

class Slider {
  private readonly $slider: JQuery;

  private _getTargetPosition: (ev: JQuery.MouseEventBase) => number;

  private _callbackMousedown: (position: number) => void;

  constructor($slider: JQuery, view: ViewName) {
    this.$slider = $slider;
    this._callbackMousedown = null;
    this._setViewName(view);
    $slider.on('mousedown.slider.select', this._handleSliderMousedown.bind(this));
  }

  public set areTooltipsVisible(state: boolean) {
    this.$slider.toggleClass(CLASSES.TOOLTIPS_HIDDEN, !state);
  }

  public get areTooltipsVisible(): boolean {
    return !this.$slider.hasClass(CLASSES.TOOLTIPS_HIDDEN);
  }

  public set areBgLineVisible(state: boolean) {
    this.$slider.toggleClass(CLASSES.BG_LINE_HIDDEN, !state);
  }

  public get areBgLineVisible(): boolean {
    return !this.$slider.hasClass(CLASSES.BG_LINE_HIDDEN);
  }

  public triggerSelectEvent(values: string[] | number[]): void {
    this.$slider.trigger('select', values);
  }

  public getTargetPosition(ev: JQuery.MouseEventBase): number {
    return this._getTargetPosition(ev);
  }

  public onSelect(callback: (position: number) => void): void {
    this._callbackMousedown = callback;
  }

  public static resetSlider($slider: JQuery): void {
    $slider
      .html('')
      .removeClass()
      .addClass('slider js-slider')
      .off('mousedown.slider.simpleClick');
  }

  private _handleSliderMousedown(ev: JQuery.MouseEventBase): void {
    if (this._callbackMousedown) this._callbackMousedown(this.getTargetPosition(ev));
  }

  private _setViewName(name: ViewName): void {
    if (name === 'vertical') {
      this.$slider.addClass('slider_view-name_vertical');
      this._getTargetPosition = this._verticalViewTargetPosition.bind(this);
    } else {
      this._getTargetPosition = this._horizontalViewTargetPosition.bind(this);
    }
  }

  private _horizontalViewTargetPosition(ev: JQuery.MouseEventBase): number {
    const absolutePosition = ev.pageX;
    const offset = this.$slider.offset().left;
    const position = (absolutePosition - offset) / this.$slider.outerWidth();

    if (position > 1) return 1;
    if (position < 0) return 0;

    return position;
  }

  private _verticalViewTargetPosition(ev: JQuery.MouseEventBase): number {
    const absolutePosition = ev.pageY;
    const offset = this.$slider.offset().top;
    let position = (absolutePosition - offset) / this.$slider.outerHeight();

    if (position > 1) position = 1;
    if (position < 0) position = 0;

    return 1 - position;
  }
}

export default Slider;
