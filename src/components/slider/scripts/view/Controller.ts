import Slider from './components/Slider';
import Point from './components/Point';

type HandleWindowResize = () => void;

interface IComponents {
  slider: Slider;
  points: Point[];
  scaleItems: JQuery[];
}

class Controller {
  private readonly components: IComponents;

  private static readonly $document = $(document);

  private selectEventCallback: HandlerSliderViewSelect;

  private resizeEventCallback: HandleWindowResize;

  private pointSelected: number;

  private static readonly POINT_NOT_SELECTED = -1;

  constructor(components: IComponents) {
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
      scaleItems,
    } = this.components;

    slider.onSelect(this._handleSliderSelect.bind(this));
    points.forEach((point) => point.onMousedown(this._handlePointMousedown.bind(this)));
    Controller.$document.on('mouseup.slider.removeEventListeners', this._handleDocumentMouseup.bind(this));
    window.addEventListener('resize', this._handleDocumentResize.bind(this));
  }

  private _handleScaleItemClick(ev: JQuery.MouseEventBase): void {
    ev.stopPropagation();

    const position = String($(ev.currentTarget).data('position'));

    try {
      if (this.selectEventCallback) this.selectEventCallback(parseFloat(position), Controller.POINT_NOT_SELECTED);
    } catch (error) {
      console.error(new TypeError('Failed to get scale item position.'));
    }    
  }

  private _triggerSelectEvent(ev: JQuery.MouseEventBase, pointIndex: number): void {
    const position = this.components.slider.getTargetPosition(ev);
    if (this.selectEventCallback) this.selectEventCallback(position, pointIndex);
  }

  private _handleSliderSelect(position: number): void {
    if (this.selectEventCallback) this.selectEventCallback(position, Controller.POINT_NOT_SELECTED);
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
    if (this.resizeEventCallback) this.resizeEventCallback();
  }

  public onSelect(callback: HandlerSliderViewSelect): void {
    this.selectEventCallback = callback;
  }

  public onResize(callback: HandleWindowResize): void {
    this.resizeEventCallback = callback;
  }
}

export default Controller;
