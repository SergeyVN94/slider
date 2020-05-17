import AbstractTooltip from './AbstractTooltip';

class VerticalSliderTooltip extends AbstractTooltip {
  public setState(position: number, value: string): void {
    const { $tooltip } = this;

    $tooltip.html(value);
    const offset = $tooltip.outerHeight() / 2;
    const containerSize = $tooltip.parent().outerHeight();
    const marginBottom = ((position * containerSize) - offset);

    $tooltip.css('bottom', `${marginBottom}px`);
  }
}

export default VerticalSliderTooltip;
