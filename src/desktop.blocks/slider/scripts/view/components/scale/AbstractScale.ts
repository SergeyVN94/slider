import CLASSES from '../../classes';

abstract class AbstractScale implements IScale {
  protected readonly $scale: JQuery;

  protected allSteps: number;

  private static redrawingTimeout = 1000 / 25;

  private awaitingRedrawing: boolean;

  constructor() {
    this.$scale = $('<div/>', {
      class: `${CLASSES.SCALE} js-${CLASSES.SCALE}`,
    });
    this.allSteps = 0;
    this.awaitingRedrawing = false;
  }

  protected _clear(): void {
    this.$scale.html('');
  }

  protected static _createScaleItem(): JQuery {
    return $('<div/>', {
      class: `${CLASSES.SCALE_ITEM} js-${CLASSES.SCALE_ITEM}`,
    });
  }

  public getElement(): JQuery {
    return this.$scale;
  }

  public draw($slider: JQuery): void {
    $slider.append(this.$scale);
  }

  public setAllSteps(allSteps: number): void {
    this.allSteps = allSteps;
    this.redraw();
  }

  public redraw(): void {
    if (!this.awaitingRedrawing) {
      this.awaitingRedrawing = true;
      setTimeout(() => {
        this._redraw();
        this.awaitingRedrawing = false;
      }, AbstractScale.redrawingTimeout);
    }
  }

  protected abstract _redraw(): void;
}

export default AbstractScale;
