import CLASSES from '../classes';

class Slider {
  private readonly $slider: JQuery;

  private _getTargetPosition: (ev: JQuery.MouseEventBase) => number;

  private _callbackMousedown: (position: number) => void;

  constructor($slider: JQuery, view: SliderViewName) {
    this.$slider = $slider;
    this._callbackMousedown = null;
    this.setViewName(view);
    $slider
      .off('mousedown')
      .on('mousedown.slider.simpleClick', this._handleSliderMousedown.bind(this));
  }

  public set showTooltips(state: boolean) {
    this.$slider.toggleClass(CLASSES.HIDE_TOOLTIPS, !state);
  }

  public get showTooltips(): boolean {
    return !this.$slider.hasClass(CLASSES.HIDE_TOOLTIPS);
  }

  public set showBgLine(state: boolean) {
    this.$slider.toggleClass(CLASSES.HIDE_BG_LINE, !state);
  }

  public get showBgLine(): boolean {
    return !this.$slider.hasClass(CLASSES.HIDE_BG_LINE);
  }

  public getElement(): JQuery {
    return this.$slider;
  }

  public setViewName(name: SliderViewName): void {
    this._resetSlider();

    if (name === 'vertical') {
      this.$slider.addClass('slider_view-name_vertical');
      this._getTargetPosition = this._verticalViewTargetPosition.bind(this);
    } else {
      this._getTargetPosition = this._horizontalViewTargetPosition.bind(this);
    }
  }

  public getTargetPosition(ev: JQuery.MouseEventBase): number {
    return this._getTargetPosition(ev);
  }

  public onSelect(callback: (position: number) => void): void {
    this._callbackMousedown = callback;
  }

  private _handleSliderMousedown(ev: JQuery.MouseEventBase): void {
    if (this._callbackMousedown) this._callbackMousedown(this.getTargetPosition(ev));
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

  private _resetSlider(): void {
    const { showTooltips, showBgLine } = this;

    this.$slider
      .html('')
      .removeClass()
      .addClass('slider js-slider');

    this.showBgLine = showBgLine;
    this.showTooltips = showTooltips;
  }
}

export default Slider;
