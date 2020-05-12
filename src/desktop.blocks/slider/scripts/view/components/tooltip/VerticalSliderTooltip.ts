import AbstractTooltip from './AbstractTooltip';

class VerticalSliderTooltip extends AbstractTooltip {
  public setState(position: number, value: string): void {
    const {
      $tooltip,
      $tooltipContainer,
    } = this;

    $tooltip.html(value);
    const offset = $tooltip.outerHeight() / 2;
    const containerSize = $tooltipContainer.outerHeight();
    const marginBottom = ((position * containerSize) - offset);

    $tooltip.css('bottom', `${marginBottom}px`);
  }
}

export default VerticalSliderTooltip;
