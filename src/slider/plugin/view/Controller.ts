import { boundMethod } from 'autobind-decorator';

import Slider from './components/Slider';
import Point from './components/Point';
import Scale from './components/Scale';

interface IComponents {
  slider: Slider;
  points: Point[];
  scale: Scale;
}

class Controller {
  private readonly components: IComponents;

  private static readonly $document = $(document);

  private positionChangeEventCallback: HandlerPointPositionChange;

  private pointIndex: number;

  constructor(components: IComponents) {
    this.components = components;
    this.positionChangeEventCallback = null;
    this.pointIndex = null;
    this.initEventListeners();
  }

  public onPointPositionChange(callback: HandlerPointPositionChange): void {
    this.positionChangeEventCallback = callback;
  }

  private initEventListeners(): void {
    const { slider, points, scale } = this.components;

    slider.onMousedown(this.handleSliderMousedown);
    scale.onMousedown(this.handleScaleMousedown);
    points.forEach((point) => point.onMousedown(this.handlePointMousedown));
    Controller.$document
      .off('mouseup.slider.removeEventListeners')
      .on('mouseup.slider.removeEventListeners', this.handleMouseup);
  }

  private triggerPositionChangeEvent(ev: JQuery.MouseEventBase, pointIndex: number): void {
    const position = this.components.slider.getTargetPosition(ev);
    if (this.positionChangeEventCallback) this.positionChangeEventCallback(position, pointIndex);
  }

  @boundMethod
  private handleScaleMousedown(position: number): void {
    if (this.positionChangeEventCallback) {
      this.positionChangeEventCallback(position);
    }
  }

  @boundMethod
  private handleSliderMousedown(position: number): void {
    if (this.positionChangeEventCallback) {
      this.positionChangeEventCallback(position);
    }
  }

  @boundMethod
  private handlePointMousedown(index: number, ev: JQuery.MouseDownEvent): void {
    this.pointIndex = index;
    Controller.$document.on('mousemove.slider.checkTargetPosition', this.handleMousemove);
    this.triggerPositionChangeEvent(ev, index);
  }

  @boundMethod
  private handleMousemove(ev: JQuery.MouseMoveEvent): void {
    this.triggerPositionChangeEvent(ev, this.pointIndex);
  }

  @boundMethod
  private handleMouseup(): void {
    Controller.$document.off('mousemove.slider.checkTargetPosition');
    this.pointIndex = null;
  }
}

export default Controller;
