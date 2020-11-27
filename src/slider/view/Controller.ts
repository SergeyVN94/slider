import { HandlerPointPositionChange, IViewComponents } from './types';

class Controller {
  private readonly components: IViewComponents;

  private positionChangeEventCallback: HandlerPointPositionChange;

  private pointIndex: number;

  constructor(components: IViewComponents) {
    this.components = components;
    this.pointIndex = null;
    this.init();
  }

  public onPointPositionChange(callback: HandlerPointPositionChange): void {
    this.positionChangeEventCallback = callback;
  }

  private init(): void {
    this.handleSliderMousedown = this.handleSliderMousedown.bind(this);
    this.handlePointMousedown = this.handlePointMousedown.bind(this);
    this.handleDocumentMouseup = this.handleDocumentMouseup.bind(this);
    this.handleDocumentMousemove = this.handleDocumentMousemove.bind(this);
    this.handleScaleMousedown = this.handleScaleMousedown.bind(this);

    const { slider, points, scale } = this.components;

    slider.onMousedown(this.handleSliderMousedown);
    points.forEach((point) => point.onMousedown(this.handlePointMousedown));
    scale.onMousedown(this.handleScaleMousedown);
    document.addEventListener('mouseup', this.handleDocumentMouseup);
  }

  private triggerPositionChangeEvent(ev: MouseEvent): void {
    const position = this.components.slider.getTargetPosition(ev);
    if (this.positionChangeEventCallback) {
      this.positionChangeEventCallback(position, this.pointIndex);
    }
  }

  private handleScaleMousedown(position: number): void {
    if (this.positionChangeEventCallback) {
      this.positionChangeEventCallback(position);
    }
  }

  private handleSliderMousedown(position: number): void {
    if (this.positionChangeEventCallback) this.positionChangeEventCallback(position);
  }

  private handlePointMousedown(index: number): void {
    this.pointIndex = index;
    document.addEventListener('mousemove', this.handleDocumentMousemove);
    document.addEventListener('mouseup', this.handleDocumentMouseup);
  }

  private handleDocumentMouseup(): void {
    if (this.pointIndex !== null) {
      this.pointIndex = null;
      document.removeEventListener('mousemove', this.handleDocumentMousemove);
    }
  }

  private handleDocumentMousemove(ev: MouseEvent): void {
    this.triggerPositionChangeEvent(ev);
  }
}

export default Controller;
