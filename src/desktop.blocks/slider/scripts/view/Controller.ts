class Controller {
  private readonly components: IViewComponents;

  private selectEventCallback: (position: number, pointSelected: number) => void;

  private resizeEventCallback: () => void;

  private handleDocumentMousemove: (ev: JQuery.MouseMoveEvent) => void;

  private pointSelected: number;

  private static readonly POINT_NOT_SELECTED = -1;

  constructor(components: IViewComponents) {
    this.components = components;
    this.selectEventCallback = null;
    this.resizeEventCallback = null;
    this.pointSelected = Controller.POINT_NOT_SELECTED;
    this._initEventListeners();
  }

  private _initEventListeners(): void {
    const {
      pointContainer,
      points,
      $document,
    } = this.components;

    this.handleDocumentMousemove = this._handleDocumentMousemove.bind(this);

    pointContainer.onClick(this._handlePointContainerClick.bind(this));
    points.forEach((point) => point.onMousedown(this._handlePointMousedown.bind(this)));
    $document.on('mouseup', this._handleDocumentMouseup.bind(this));
    window.addEventListener('resize', this._handleDocumentResize.bind(this));
  }

  private _handlePointContainerClick(position: number): void {
    if (this.pointSelected === Controller.POINT_NOT_SELECTED) {
      if (this.selectEventCallback !== null) {
        this.selectEventCallback(position, Controller.POINT_NOT_SELECTED);
      }
    }
  }

  private _handlePointMousedown(index: number): void {
    this.pointSelected = index;
    this.components.$document.on('mousemove', this.handleDocumentMousemove);
  }

  private _handleDocumentMousemove(ev: JQuery.MouseMoveEvent): void {
    const targetPosition = this.components.pointContainer.getTargetPosition(ev);
    if (this.selectEventCallback !== null) {
      this.selectEventCallback(targetPosition, this.pointSelected);
    }
  }

  private _handleDocumentMouseup(): void {
    this.components.$document.off('mousemove', this.handleDocumentMousemove);
    this.pointSelected = Controller.POINT_NOT_SELECTED;
  }

  private _handleDocumentResize(): void {
    if (this.resizeEventCallback !== null) {
      this.resizeEventCallback();
    }
  }

  public onSelect(selectEventCallback: (position: number, pointSelected: number) => void): void {
    this.selectEventCallback = selectEventCallback;
  }

  public onResize(resizeEventCallback: () => void): void {
    this.resizeEventCallback = resizeEventCallback;
  }
}

export default Controller;
