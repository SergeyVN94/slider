class Controller {
  private readonly components: IViewComponents;

  private static readonly $document = $(document);

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
      slider,
      points,
    } = this.components;

    this.handleDocumentMousemove = this._handleDocumentMousemove.bind(this);

    slider.getElement().on('mousedown', this._handleSliderMousedown.bind(this));
    points.forEach((point) => point.onMousedown(this._handlePointMousedown.bind(this)));
    Controller.$document.on('mouseup', this._handleDocumentMouseup.bind(this));
    window.addEventListener('resize', this._handleDocumentResize.bind(this));
  }

  private _handleSliderMousedown(ev: JQuery.MouseEventBase): void {
    const position = this.components.slider.getTargetPosition(ev);
    this.selectEventCallback(position, Controller.POINT_NOT_SELECTED);
  }

  private _handlePointMousedown(index: number, ev: JQuery.MouseDownEvent): void {
    this.pointSelected = index;
    Controller.$document.on('mousemove', this.handleDocumentMousemove);
    const position = this.components.slider.getTargetPosition(ev);
    this.selectEventCallback(position, index);
  }

  private _handleDocumentMousemove(ev: JQuery.MouseMoveEvent): void {
    const position = this.components.slider.getTargetPosition(ev);
    this.selectEventCallback(position, this.pointSelected);
  }

  private _handleDocumentMouseup(): void {
    Controller.$document.off('mousemove', this.handleDocumentMousemove);
    this.pointSelected = Controller.POINT_NOT_SELECTED;
  }

  private _handleDocumentResize(): void {
    this.resizeEventCallback();
  }

  public onSelect(selectEventCallback: (position: number, pointSelected: number) => void): void {
    this.selectEventCallback = selectEventCallback;
  }

  public onResize(resizeEventCallback: () => void): void {
    this.resizeEventCallback = resizeEventCallback;
  }
}

export default Controller;
