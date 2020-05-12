import AbstractBgLine from './AbstractBgLine';

class HorizontalBgLine extends AbstractBgLine {
  public update(max: number, min = 0): void {
    const containerWidth = this.pointContainer.getSize();
    const marginLeft = min * containerWidth;
    const marginRight = containerWidth - (max * containerWidth);

    this.$bgLine
      .css('right', `${marginRight}px`)
      .css('left', `${marginLeft}px`);
  }
}

export default HorizontalBgLine;
