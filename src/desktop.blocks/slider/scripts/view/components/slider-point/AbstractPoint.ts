import CLASSES from '../../classes';

abstract class AbstractPoint implements IPoint {
  protected readonly $point: JQuery;

  protected readonly pointContainer: IPointContainer;

  protected readonly index: number;

  constructor(index: number, pointContainer: IPointContainer) {
    this.index = index;
    this.pointContainer = pointContainer;
    this.$point = this._createPoint();
    pointContainer.getElement().append(this.$point);
  }

  private _createPoint(): JQuery {
    const { index } = this;

    return $('<div/>', {
      class: `${CLASSES.POINT} js-${CLASSES.POINT}`,
      'data-index': index,
    });
  }

  public getElement(): JQuery {
    return this.$point;
  }

  public abstract setPosition(position: number): void;
}

export default AbstractPoint;
