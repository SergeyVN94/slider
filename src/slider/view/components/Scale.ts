import CLASSES from '../classes';
import { PointState, ViewName, VIEW_VERTICAL } from '../types';

type MousedownCallback = (position: number) => void;

class Scale {
  private readonly items: HTMLElement[];

  private mousedownCallback: MousedownCallback;

  private viewName: ViewName;

  constructor(scaleItems: PointState[], viewName: ViewName) {
    this.items = [];
    this.viewName = viewName;
    this.mousedownCallback = null;
    this.init(scaleItems);
  }

  public onMousedown(callback: MousedownCallback): void {
    this.mousedownCallback = callback;
  }

  public draw(slider: HTMLElement): void {
    this.items.forEach((item) => slider.appendChild(item));
  }

  private init(scaleItems: PointState[]): void {
    scaleItems.forEach(({ position, value }) => {
      const item = document.createElement('div');
      item.classList.add(CLASSES.SCALE_ITEM);
      item.dataset.position = position.toString();
      item.style[this.viewName === VIEW_VERTICAL ? 'bottom' : 'left'] = `${(position * 100)}%`;
      item.textContent = value.toString();
      this.items.push(item);
    });
  }

  // private handleMousedown(ev: JQuery.MouseDownEvent): void {
  //   if (this.mousedownCallback) {
  //     const $target = $(ev.target);
  //     const position = parseFloat(String($target.data('position')));

  //     if ($target.hasClass(CLASSES.SCALE_ITEM) && !Number.isNaN(position)) {
  //       ev.stopPropagation(); // что бы не отрабатывал обработчик класса Slider
  //       this.mousedownCallback(position);
  //     }
  //   }
  // }
}

export default Scale;
