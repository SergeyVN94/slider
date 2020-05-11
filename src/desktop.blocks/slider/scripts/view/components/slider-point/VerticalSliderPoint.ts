import AbstractPoint from './AbstractPoint';

class VerticalSliderPoint extends AbstractPoint {
  public setPosition(position: number): void {
    const {
      $point,
      pointContainer,
    } = this;

    const containerHeight = pointContainer.getSize();
    const offset = $point.outerHeight() / 2;
    const marginBottom = (position * containerHeight) - offset;
    $point.css('bottom', `${marginBottom}px`);
  }
}

export default VerticalSliderPoint;
