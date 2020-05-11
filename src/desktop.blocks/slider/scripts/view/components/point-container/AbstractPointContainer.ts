import CLASSES from '../../classes';

abstract class AbstractPointContainer implements IPointContainer {
  private clickEventCallback: (position: number) => void;

  protected readonly $pointContainer: JQuery;

  constructor() {
    this.$pointContainer = AbstractPointContainer._createPointContainer();
    this.$pointContainer.on('click', this._handleContainerClick.bind(this));
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

  private _handleContainerClick(ev: JQuery.MouseMoveEvent): void {
    this.clickEventCallback(this.getTargetPosition(ev));
  }

  public abstract getSize(): number;

  public abstract getTargetPosition(ev: JQuery.MouseEventBase): number;
}

export default AbstractPointContainer;
