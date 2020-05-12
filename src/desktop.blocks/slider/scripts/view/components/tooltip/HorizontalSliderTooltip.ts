import AbstractTooltip from './AbstractTooltip';

class HorizontalSliderTooltip extends AbstractTooltip {
  public setState(position: number, value: string): void {
    const {
      $tooltip,
      $tooltipContainer,
    } = this;

    $tooltip.html(value);
    const offset = $tooltip.outerWidth() / 2;
    const containerSize = $tooltipContainer.outerWidth();
    const marginLeft = (position * containerSize) - offset;

    $tooltip.css('left', `${marginLeft}px`);
  }
}

export default HorizontalSliderTooltip;
