import CLASSES from '../../classes';

abstract class AbstractSlider implements ISlider {
  protected readonly $slider: JQuery;

  constructor($slider: JQuery) {
    this.$slider = $slider;
  }

  public static resetSlider($slider: JQuery): void {
    const isTooltipsHidden = $slider.hasClass(CLASSES.HIDE_TOOLTIPS);
    const isBgLineHidden = $slider.hasClass(CLASSES.HIDE_BG_LINE);

    $slider
      .off()
      .html('')
      .removeClass()
      .addClass('slider js-slider')
      .toggleClass(CLASSES.HIDE_TOOLTIPS, isTooltipsHidden)
      .toggleClass(CLASSES.HIDE_BG_LINE, isBgLineHidden);
  }

  public set showTooltips(state: boolean) {
    this.$slider.toggleClass(CLASSES.HIDE_TOOLTIPS, !state);
  }

  public get showTooltips(): boolean {
    return this.$slider.hasClass(CLASSES.HIDE_TOOLTIPS);
  }

  public set showBgLine(state: boolean) {
    this.$slider.toggleClass(CLASSES.HIDE_BG_LINE, !state);
  }

  public get showBgLine(): boolean {
    return this.$slider.hasClass(CLASSES.HIDE_BG_LINE);
  }

  public getElement(): JQuery {
    return this.$slider;
  }

  public abstract getTargetPosition(ev: JQuery.MouseEventBase): number;
}

export default AbstractSlider;
