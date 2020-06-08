import CLASSES from '../../classes';

abstract class AbstractScale implements IScale {
  protected readonly $scale: JQuery;

  protected maxStep: number;

  protected stepSize: number;

  protected itemPaddings: number;

  private static redrawingTimeout = 1000 / 25;

  private awaitingRedrawing: boolean;

  protected stepToValue: HandlerStepToValueEvent;

  constructor() {
    this.$scale = $('<div/>', {
      class: `${CLASSES.SCALE} js-${CLASSES.SCALE}`,
    });
    this.maxStep = 0;
    this.stepSize = 1;
    this.awaitingRedrawing = false;
    this.itemPaddings = 30;
    this.stepToValue = null;
  }

  public getElement(): JQuery {
    return this.$scale;
  }

  public draw($slider: JQuery): void {
    $slider.append(this.$scale);
  }

  public setMaxStep(maxStep: number): void {
    this.maxStep = maxStep;
    this.redraw();
  }

  public setStepSize(stepSize: number): void {
    this.stepSize = stepSize;
    this.redraw();
  }

  public redraw(): void {
    if (!this.awaitingRedrawing) {
      this.awaitingRedrawing = true;
      setTimeout(() => {
        if (this.maxStep > 1 && this.stepSize > 0) this._redraw();
        this.awaitingRedrawing = false;
      }, AbstractScale.redrawingTimeout);
    }
  }

  public onStepToValue(callback: HandlerStepToValueEvent): void {
    this.stepToValue = callback;
  }

  private _clear(): void {
    this.$scale.html('');
  }

  protected static _createScaleItem(): JQuery {
    return $('<div/>', {
      class: `${CLASSES.SCALE_ITEM} js-${CLASSES.SCALE_ITEM}`,
    });
  }

  protected _redraw(): boolean {
    this._clear();

    const containerSize = this._getScaleSize();
    const $testItem = AbstractScale._createScaleItem();
    this.$scale.append($testItem);
    const itemSize = this._getItemSize($testItem);
    $testItem.remove();

    const maxItems = Math.floor(containerSize / itemSize);
    const allItems = Math.floor(this.maxStep / this.stepSize);
    const multiple = Math.ceil(allItems / maxItems);

    for (let i = 0; i <= allItems; i += multiple) {
      const $item = AbstractScale._createScaleItem();
      const step = Math.round(i * this.stepSize);
      const position = step / this.maxStep;
      this._setItemPosition($item, position, containerSize);

      if (this.stepToValue) {
        const value = this.stepToValue(step);
        $item.text(value);
      }

      this.$scale.append($item);
    }

    return true;
  }

  protected abstract _getScaleSize(): number;

  protected abstract _getItemSize(item: JQuery): number;

  protected abstract _setItemPosition(
    $item: JQuery, position: number, containerSize?: number
  ): void;
}

export default AbstractScale;
