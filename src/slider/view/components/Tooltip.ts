import CLASSES from '../classes';
import { ViewName, VIEW_HORIZONTAL } from '../types';

class Tooltip {
  private readonly tooltip: HTMLElement;

  private readonly viewName: ViewName;

  constructor(viewName: ViewName) {
    this.viewName = viewName;
    this.tooltip = document.createElement('div');
    this.init();
  }

  public update(position: number, value: string): void {
    this.tooltip.textContent = value;

    if (this.viewName === VIEW_HORIZONTAL) this.tooltip.style.left = `${position * 100}%`;
    else this.tooltip.style.top = `${100 - (position * 100)}%`;
  }

  public draw(slider: HTMLElement): void {
    slider.appendChild(this.tooltip);
  }

  public setZIndex(index: string | number): void {
    this.tooltip.style.zIndex = index.toString();
  }

  private init(): void {
    this.tooltip.classList.add(CLASSES.TOOLTIP);
  }

  // public static updateZIndexes(tooltips: Tooltip[], points: Point[]): void {
  //   points.forEach((point, index) => {
  //     tooltips[index].setZIndex(point.zIndex);
  //   });
  // }

  // private setZIndex(zIndex: number): void {
  //   this.$tooltip.css('z-index', zIndex);
  // }
}

export default Tooltip;
