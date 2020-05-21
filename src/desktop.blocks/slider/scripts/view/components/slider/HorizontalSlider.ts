import AbstractSlider from './AbstractSlider';

class HorizontalSlider extends AbstractSlider {
  public getTargetPosition(ev: JQuery.MouseEventBase): number {
    const absolutePosition = ev.pageX;
    const offset = this.$slider.offset().left;
    const position = (absolutePosition - offset) / this.$slider.outerWidth();

    if (position > 1) return 1;
    if (position < 0) return 0;

    return position;
  }
}

export default HorizontalSlider;
