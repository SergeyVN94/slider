import Slider from './components/Slider';
import Point from './components/Point';

interface IComponents {
  slider: Slider;
  points: Point[];
  scaleItems: JQuery[];
}

class Controller {
  private readonly components: IComponents;

  private static readonly $document = $(document);

  private positionChangeEventCallback: HandlerThumbPositionChange;

  private pointSelected: number;

  private static readonly POINT_NOT_SELECTED = -1;

  constructor(components: IComponents) {
    this.components = components;
    this.positionChangeEventCallback = null;
    this.pointSelected = Controller.POINT_NOT_SELECTED;
    this._initEventListeners();
  }

  public onThumbPositionChange(callback: HandlerThumbPositionChange): void {
    this.positionChangeEventCallback = callback;
  }

  private _initEventListeners(): void {
    const { slider, points } = this.components;

    slider.onMousedown(this._handleSliderSelect.bind(this));
    points.forEach((point) => point.onMousedown(this._handlePointMousedown.bind(this)));
    Controller.$document
      .off('mouseup.slider.removeEventListeners')
      .on('mouseup.slider.removeEventListeners', this._handleDocumentMouseup.bind(this));
  }

  private _triggerSelectEvent(ev: JQuery.MouseEventBase, pointIndex: number): void {
    const position = this.components.slider.getTargetPosition(ev);
    if (this.positionChangeEventCallback) this.positionChangeEventCallback(position, pointIndex);
  }

  private _handleSliderSelect(position: number): void {
    if (this.positionChangeEventCallback) {
      this.positionChangeEventCallback(position, Controller.POINT_NOT_SELECTED);
    }
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
}

export default Controller;
