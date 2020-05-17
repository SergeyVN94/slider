import AbstractBgLine from './AbstractBgLine';

class HorizontalBgLine extends AbstractBgLine {
  public update(max: number, min = 0): void {
    const { $bgLine } = this;

    const containerWidth = $bgLine.parent().outerWidth();
    const marginLeft = min * containerWidth;
    const marginRight = containerWidth - (max * containerWidth);

    $bgLine
      .css('right', `${marginRight}px`)
      .css('left', `${marginLeft}px`);
  }
}

export default HorizontalBgLine;
