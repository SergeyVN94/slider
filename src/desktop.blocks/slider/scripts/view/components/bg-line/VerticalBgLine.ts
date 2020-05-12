import AbstractBgLine from './AbstractBgLine';

class VerticalBgLine extends AbstractBgLine {
  public update(max: number, min = 0): void {
    const containerHeight = this.pointContainer.getSize();
    const marginBottom = min * containerHeight;
    const marginTop = containerHeight - (max * containerHeight);

    this.$bgLine
      .css('top', `${marginTop}px`)
      .css('bottom', `${marginBottom}px`);
  }
}

export default VerticalBgLine;
