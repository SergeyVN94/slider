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
    this.init(scaleItems);
  }

  public onMousedown(callback: MousedownCallback): void {
    this.mousedownCallback = callback;
  }

  public draw(slider: HTMLElement): void {
    this.items.forEach((item) => slider.appendChild(item));
    this.initEventListeners();
  }

  private initEventListeners(): void {
    this.handleMousedown = this.handleMousedown.bind(this);

    if (this.items.length) {
      this.items[0].parentElement.addEventListener('mousedown', this.handleMousedown);
    }
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

  private handleMousedown(ev: MouseEvent): void {
    if (this.mousedownCallback) {
      const target = ev.target as HTMLElement;
      const isValidTarget = target.classList && target.classList.contains(CLASSES.SCALE_ITEM);

      if (isValidTarget) {
        ev.preventDefault();
        const position = parseFloat(target.dataset.position);
        this.mousedownCallback(position);
      }
    }
  }
}

export default Scale;
