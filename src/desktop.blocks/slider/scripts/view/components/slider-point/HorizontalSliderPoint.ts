import AbstractPoint from './AbstractPoint';

class HorizontalSliderPoint extends AbstractPoint {
  public setPosition(position: number): void {
    const {
      $point,
      pointContainer,
    } = this;

    const containerWidth = pointContainer.getSize();
    const offset = $point.outerWidth() / 2;
    const marginLeft = (position * containerWidth) - offset;
    $point.css('left', `${marginLeft}px`);
  }
}

export default HorizontalSliderPoint;
