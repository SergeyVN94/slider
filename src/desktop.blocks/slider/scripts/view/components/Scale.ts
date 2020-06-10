import CLASSES from '../classes';

class Scale {
  private readonly $slider: JQuery;

  private readonly scaleItems: JQuery[];

  private maxStep: number;

  private stepSize: number;

  private stepToValue: HandlerStepToValueEvent;

  private static redrawingTimeout = 1000 / 25;

  private awaitingRedrawing: boolean;

  private clickCallback: HandleScaleItemClickEvent;

  private viewName: SliderViewName;

  constructor($slider: JQuery, viewName: SliderViewName) {
    this.$slider = $slider;
    this.scaleItems = [];
    this.maxStep = 0;
    this.stepSize = 1;
    this.awaitingRedrawing = false;
    this.stepToValue = null;
    this.clickCallback = null;
    this.viewName = viewName;
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
      }, Scale.redrawingTimeout);
    }
  }

  public onStepToValue(callback: HandlerStepToValueEvent): void {
    this.stepToValue = callback;
  }

  public onClick(callback: HandleScaleItemClickEvent): void {
    this.clickCallback = callback;
  }

  public setViewName(name: SliderViewName): void {
    this.viewName = name;
    this.redraw();
  }

  private _clear(): void {
    while (this.scaleItems.length) this.scaleItems.pop().remove();
  }

  private static _createScaleItem(): JQuery {
    return $('<div/>', {
      class: `${CLASSES.SCALE_ITEM} js-${CLASSES.SCALE_ITEM}`,
    });
  }

  private _redraw(): void {
    this._clear();

    const containerSize = this._getSliderSize();
    const $testItem = Scale._createScaleItem();
    this.$slider.append($testItem.text('WWWWWWWW'));
    const itemSize = this._getItemSize($testItem);
    $testItem.remove();

    const maxItems = Math.floor(containerSize / itemSize);
    const allItems = Math.floor(this.maxStep / this.stepSize);
    const multiple = Math.ceil(allItems / maxItems);

    for (let i = 0; i <= allItems; i += multiple) {
      const $item = Scale._createScaleItem();
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

  private _getSliderSize(): number {
    if (this.viewName === 'vertical') {
      return this.$slider.outerHeight();
    }

    return this.$slider.outerWidth();
  }

  private _getItemSize($item: JQuery): number {
    if (this.viewName === 'vertical') {
      return $item.outerHeight();
    }

    return $item.outerWidth();
  }

  private _setItemPosition($item: JQuery, position: number, containerSize = 0): void {
    if (this.viewName === 'vertical') {
      const offset = $item.outerHeight() / 2;
      const px = (position * (containerSize || this._getSliderSize())) - offset;
      $item.css('bottom', `${px}px`);
    } else {
      const offset = $item.outerWidth() / 2;
      const px = (position * (containerSize || this._getSliderSize())) - offset;
      $item.css('left', `${px}px`);
    }
  }
}

export default Scale;
