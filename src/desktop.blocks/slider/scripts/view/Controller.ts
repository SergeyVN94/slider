class Controller {
  private readonly components: IViewComponents;

  private static readonly $document = $(document);

  private selectEventCallback: (position: number, pointSelected: number) => void;

  private resizeEventCallback: () => void;

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
      scale,
    } = this.components;

    slider.getElement().on('mousedown.slider.checkSingleClick', this._handleSliderMousedown.bind(this));
    points.forEach((point) => point.onMousedown(this._handlePointMousedown.bind(this)));
    Controller.$document.on('mouseup.slider.removeEventListeners', this._handleDocumentMouseup.bind(this));
    window.addEventListener('resize', this._handleDocumentResize.bind(this));
    scale.onClick(this._handleScaleClick.bind(this));
  }

  private _handleScaleClick(position: number): void {
    this.selectEventCallback(position, Controller.POINT_NOT_SELECTED);
  }

  private _triggerSelectEvent(ev: JQuery.MouseEventBase, pointIndex: number): void {
    const position = this.components.slider.getTargetPosition(ev);
    this.selectEventCallback(position, pointIndex);
  }

  private _handleSliderMousedown(ev: JQuery.MouseEventBase): void {
    this._triggerSelectEvent(ev, Controller.POINT_NOT_SELECTED);
  }

  private _handlePointMousedown(index: number, ev: JQuery.MouseDownEvent): void {
    this.pointSelected = index;
    Controller.$document.on('mousemove.slider.checkTargetPosition', this._handleDocumentMousemove.bind(this));
    this._triggerSelectEvent(ev, index);
  }

  private _handleDocumentMousemove(ev: JQuery.MouseMoveEvent): void {
    this._triggerSelectEvent(ev, this.pointSelected);
  }

  private _handleDocumentMouseup(): void {
    Controller.$document.off('mousemove.slider.checkTargetPosition');
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
