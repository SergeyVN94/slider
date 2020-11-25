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
    const { slider, points } = this.components;

    slider.onMousedown(this.handleSliderMousedown.bind(this));
    points.forEach((point) => point.onMousedown(this.handlePointMousedown.bind(this)));
    document.addEventListener('mouseup', this.handleMouseup.bind(this));

    this.handleMousemove = this.handleMousemove.bind(this);

    // scale.onMousedown(this.handleScaleMousedown);
    // Controller.$document
    //   .off('mouseup.slider.removeEventListeners')
    //   .on('mouseup.slider.removeEventListeners', this.handleMouseup);
  }

  private triggerPositionChangeEvent(ev: MouseEvent): void {
    const position = this.components.slider.getTargetPosition(ev);
    if (this.positionChangeEventCallback) {
      this.positionChangeEventCallback(position, this.pointIndex);
    }
  }

  // private handleScaleMousedown(position: number): void {
  //   if (this.positionChangeEventCallback) {
  //     this.positionChangeEventCallback(position);
  //   }
  // }

  private handleSliderMousedown(position: number): void {
    if (this.positionChangeEventCallback) this.positionChangeEventCallback(position);
  }

  private handlePointMousedown(index: number): void {
    this.pointIndex = index;
    document.addEventListener('mousemove', this.handleMousemove);
    document.addEventListener('mouseup', this.handleMousemove);
  }

  private handleMouseup(ev: MouseEvent): void {
    if (this.pointIndex !== null) {
      this.pointIndex = null;
      document.removeEventListener('mousemove', this.handleMousemove);
      this.triggerPositionChangeEvent(ev);
    }
  }

  private handleMousemove(ev: MouseEvent): void {
    this.triggerPositionChangeEvent(ev);
  }

  // @boundMethod
  // private handleMouseup(): void {
  //   Controller.$document.off('mousemove.slider.checkTargetPosition');
  //   this.pointIndex = null;
  // }
}

export default Controller;
