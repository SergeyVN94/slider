import CLASSES from '../../classes';

abstract class AbstractPointContainer implements IPointContainer {
  protected readonly $pointContainer: JQuery;

  constructor() {
    this.$pointContainer = AbstractPointContainer._createPointContainer();
  }

  private static _createPointContainer(): JQuery {
    return $('<div/>', {
      class: CLASSES.POINT_CONTAINER,
    });
  }

  public getElement(): JQuery {
    return this.$pointContainer;
  }

  public abstract getSize(): number;
}

export default AbstractPointContainer;
