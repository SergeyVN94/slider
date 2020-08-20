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

  private positionChangeEventCallback: HandlerPointPositionChange;

  private pointSelected: number;

  private static readonly POINT_NOT_SELECTED = -1;

  constructor(components: IComponents) {
    this.components = components;
    this.positionChangeEventCallback = null;
    this.pointSelected = Controller.POINT_NOT_SELECTED;
    this._initEventListeners();
  }

  public onPointPositionChange(callback: HandlerPointPositionChange): void {
    this.positionChangeEventCallback = callback;
  }

  private _initEventListeners(): void {
    const { slider, points } = this.components;

    slider.onMousedown(this._handleSliderMousedown.bind(this));
    points.forEach((point) => point.onMousedown(this._handlePointMousedown.bind(this)));
    Controller.$document
      .off('mouseup.slider.removeEventListeners')
      .on('mouseup.slider.removeEventListeners', this._handleMouseup.bind(this));
  }

  private _triggerPositionChangeEvent(ev: JQuery.MouseEventBase, pointIndex: number): void {
    const position = this.components.slider.getTargetPosition(ev);
    if (this.positionChangeEventCallback) this.positionChangeEventCallback(position, pointIndex);
  }

  private _handleSliderMousedown(position: number): void {
    if (this.positionChangeEventCallback) {
      this.positionChangeEventCallback(position, Controller.POINT_NOT_SELECTED);
    }
  }

  private _handlePointMousedown(index: number, ev: JQuery.MouseDownEvent): void {
    this.pointSelected = index;
    Controller.$document.on('mousemove.slider.checkTargetPosition', this._handleMousemove.bind(this));
    this._triggerPositionChangeEvent(ev, index);
  }

  private _handleMousemove(ev: JQuery.MouseMoveEvent): void {
    this._triggerPositionChangeEvent(ev, this.pointSelected);
  }

  private _handleMouseup(): void {
    Controller.$document.off('mousemove.slider.checkTargetPosition');
    this.pointSelected = Controller.POINT_NOT_SELECTED;
  }
}

export default Controller;
