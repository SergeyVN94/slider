import AbstractSlider from './AbstractSlider';

class VerticalSlider extends AbstractSlider {
  constructor($slider: JQuery) {
    super($slider);
    $slider.addClass('slider_view-name_vertical');
  }

  public getTargetPosition(ev: JQuery.MouseEventBase): number {
    const absolutePosition = ev.pageY;
    const offset = this.$slider.offset().top;
    let position = (absolutePosition - offset) / this.$slider.outerHeight();

    if (position > 1) position = 1;
    if (position < 0) position = 0;

    return 1 - position;
  }
}

export default VerticalSlider;
