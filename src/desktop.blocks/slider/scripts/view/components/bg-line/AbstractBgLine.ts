import CLASSES from '../../classes';

abstract class AbstractBgLine implements IBgLine {
  protected readonly $bgLine: JQuery;

  constructor() {
    this.$bgLine = $('<div/>', {
      class: `${CLASSES.BG_LINE} js-${CLASSES.BG_LINE}`,
    });
  }

  public getElement(): JQuery {
    return this.$bgLine;
  }

  public abstract update(max: number, min?: number): void;
}

export default AbstractBgLine;
