import CLASSES from '../../classes';

abstract class AbstractBgLine implements IBgLine {
  protected readonly pointContainer: IPointContainer;

  protected readonly $bgLine: JQuery;

  constructor(pointContainer: IPointContainer) {
    this.pointContainer = pointContainer;
    this.$bgLine = $('<div/>', {
      class: `${CLASSES.BG_LINE} js-${CLASSES.BG_LINE}`,
    });
    this.pointContainer.getElement().append(this.$bgLine);
  }

  public getElement(): JQuery {
    return this.$bgLine;
  }

  public abstract update(max: number, min?: number): void;
}

export default AbstractBgLine;