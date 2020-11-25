import CLASSES from '../classes';
import { HandleSliderMousedown, ViewName, VIEW_VERTICAL } from '../types';

class Slider {
  private readonly slider: HTMLElement;

  private callbackMousedown: HandleSliderMousedown;

  private readonly viewName: ViewName;

  constructor(viewName: ViewName) {
    this.slider = document.createElement('div');
    this.viewName = viewName;
    this.init();
  }

  public getElement(): HTMLElement {
    return this.slider;
  }

  public getTargetPosition(ev: MouseEvent): number {
    const isVerticalView = this.viewName === VIEW_VERTICAL;

    const absolutePosition = isVerticalView
      ? ev.pageY
      : ev.pageX;

    const offset = this.slider.getBoundingClientRect();

    const position = isVerticalView
      ? (absolutePosition - offset.y) / this.slider.clientHeight
      : (absolutePosition - offset.x) / this.slider.clientWidth;

    if (position > 1) return 1;
    if (position < 0) return 0;

    return (isVerticalView ? 1 - position : position);
  }

  public onMousedown(callback: HandleSliderMousedown): void {
    this.callbackMousedown = callback;
  }

  private init(): void {
    this.slider.classList.add(CLASSES.SLIDER);
    if (this.viewName === VIEW_VERTICAL) this.slider.classList.add(CLASSES.VIEW_NAME_VERTICAL);
    this.slider.addEventListener('mousedown', this.handleMousedown.bind(this));
  }

  private handleMousedown(ev: MouseEvent): void {
    if (this.callbackMousedown) {
      const target = ev.target as HTMLElement;
      const isValidTarget = 'classList' in target && target.classList.contains(CLASSES.SLIDER);

      if (isValidTarget) this.callbackMousedown(this.getTargetPosition(ev));
    }
  }
}

export default Slider;
