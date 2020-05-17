import CLASSES from '../../classes';

abstract class AbstractPoint implements IPoint {
  protected readonly $point: JQuery;

  protected readonly index: number;

  private mousedownCallback: (index: number, ev: JQuery.MouseDownEvent) => void;

  constructor(index: number) {
    this.index = index;
    this.$point = this._createPoint();
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

  public onMousedown(callback: (index: number, ev: JQuery.MouseDownEvent) => void): void {
    this.mousedownCallback = callback;
    this.$point.on('mousedown', this._handlePointMousedown.bind(this));
  }

  public abstract setPosition(position: number): void;

  private _handlePointMousedown(ev: JQuery.MouseDownEvent): void {
    this.mousedownCallback(this.index, ev);
  }
}

export default AbstractPoint;
