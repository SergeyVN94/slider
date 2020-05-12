import CLASSES from '../../classes';

abstract class AbstractPointContainer implements IPointContainer {
  private clickEventCallback: (position: number) => void;

  protected readonly $pointContainer: JQuery;

  constructor() {
    this.$pointContainer = AbstractPointContainer._createPointContainer();
    // mousedown используется вместо click, что бы не конфликтовать с другими событиями
    this.$pointContainer.on('mousedown', this._handleContainerMousedown.bind(this));
  }

  private static _createPointContainer(): JQuery {
    return $('<div/>', {
      class: CLASSES.POINT_CONTAINER,
    });
  }

  public getElement(): JQuery {
    return this.$pointContainer;
  }

  public onClick(callback: (position: number) => void): void {
    this.clickEventCallback = callback;
  }

  private _handleContainerMousedown(ev: JQuery.MouseMoveEvent): void {
    this.clickEventCallback(this.getTargetPosition(ev));
  }

  public abstract getSize(): number;

  public abstract getTargetPosition(ev: JQuery.MouseEventBase): number;
}

export default AbstractPointContainer;
