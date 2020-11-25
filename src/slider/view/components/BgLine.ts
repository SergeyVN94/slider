import CLASSES from '../classes';
import { ViewName } from '../types';

class BgLine {
  private readonly bgLine: HTMLElement;

  private readonly viewName: ViewName;

  constructor(viewName: ViewName) {
    this.viewName = viewName;
    this.bgLine = document.createElement('div');
    this.init();
  }

  public update(max: number, min = 0): void {
    if (this.viewName === 'horizontal') {
      this.bgLine.style.right = `${100 - (max * 100)}%`;
      this.bgLine.style.left = `${min * 100}%`;
    } else {
      this.bgLine.style.top = `${100 - (max * 100)}%`;
      this.bgLine.style.bottom = `${min * 100}%`;
    }
  }

  public draw(slider: HTMLElement): void {
    slider.appendChild(this.bgLine);
  }

  private init(): void {
    this.bgLine.classList.add(CLASSES.BG_LINE);
  }
}

export default BgLine;
