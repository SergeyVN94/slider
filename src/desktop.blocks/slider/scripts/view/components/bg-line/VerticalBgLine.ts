import AbstractBgLine from './AbstractBgLine';

class VerticalBgLine extends AbstractBgLine {
  public update(max: number, min = 0): void {
    const { $bgLine } = this;

    const containerHeight = $bgLine.parent().outerHeight();
    const marginBottom = min * containerHeight;
    const marginTop = containerHeight - (max * containerHeight);

    $bgLine
      .css('top', `${marginTop}px`)
      .css('bottom', `${marginBottom}px`);
  }
}

export default VerticalBgLine;
