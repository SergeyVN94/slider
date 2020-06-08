import CLASSES from '../../classes';

abstract class AbstractScale implements IScale {
  protected readonly $slider: JQuery;

  protected readonly scaleItems: JQuery[];

  protected maxStep: number;

  protected stepSize: number;

  protected itemPaddings: number;

  protected stepToValue: HandlerStepToValueEvent;

  private static redrawingTimeout = 1000 / 25;

  private awaitingRedrawing: boolean;

  private clickCallback: HandleScaleItemClickEvent;

  constructor($slider: JQuery) {
    this.$slider = $slider;
    this.scaleItems = [];
    this.maxStep = 0;
    this.stepSize = 1;
    this.awaitingRedrawing = false;
    this.itemPaddings = 6;
    this.stepToValue = null;
    this.clickCallback = null;
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

  public onClick(callback: HandleScaleItemClickEvent): void {
    this.clickCallback = callback;
  }

  private _clear(): void {
    while (this.scaleItems.length) this.scaleItems.pop().remove();
  }

  protected static _createScaleItem(): JQuery {
    return $('<div/>', {
      class: `${CLASSES.SCALE_ITEM} js-${CLASSES.SCALE_ITEM}`,
    });
  }

  protected _redraw(): void {
    this._clear();

    const containerSize = this._getSliderSize();
    const $testItem = AbstractScale._createScaleItem();
    this.$slider.append($testItem.text('Hello, World!'));
    const itemSize = this._getItemSize($testItem);
    $testItem.remove();

    const maxItems = Math.floor(containerSize / itemSize);
    const allItems = Math.floor(this.maxStep / this.stepSize);
    const multiple = Math.ceil(allItems / maxItems);

    for (let i = 0; i <= allItems; i += multiple) {
      const $item = AbstractScale._createScaleItem();
      const step = Math.round(i * this.stepSize);
      $item.data('step', step);

      if (this.stepToValue) {
        const value = this.stepToValue(step);
        $item.text(value);
      }

      this.scaleItems.push($item);
      this.$slider.append($item);

      $item.on('mousedown.slider.scale.select', this._handleItemMousedown.bind(this));

      const position = step / this.maxStep;
      $item.data('position', position);
      this._setItemPosition($item, position, containerSize);
    }
  }

  private _handleItemMousedown(ev: JQuery.MouseDownEvent): void {
    ev.stopPropagation(); // Что бы не конфликтовало с кликом по самому сладеру.

    if (this.clickCallback) {
      const position = String($(ev.currentTarget).data('position'));

      try {
        this.clickCallback(parseFloat(position));
      } catch (error) {
        console.error(new TypeError('Incorrect position.'));
      }
    }
  }

  protected abstract _getSliderSize(): number;

  protected abstract _getItemSize(item: JQuery): number;

  protected abstract _setItemPosition(
    $item: JQuery, position: number, containerSize?: number
  ): void;
}

export default AbstractScale;
