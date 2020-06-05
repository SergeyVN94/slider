import AbstractScale from './AbstractScale';

class VerticalSliderScale extends AbstractScale {
  public _redraw(): boolean {
    this._clear();

    if (this.allSteps < 2) {
      return false;
    }

    const containerSize = this.$scale.outerHeight();
    const $testItem = AbstractScale._createScaleItem();
    this.$scale.append($testItem);
    const itemSize = $testItem.outerHeight() + 30;
    $testItem.remove();
    const maxItems = containerSize / itemSize;

    if (this.allSteps <= maxItems) {
      for (let i = 0; i <= this.allSteps; i += 1) {
        const position = i / this.allSteps;
        const $item = AbstractScale._createScaleItem();
        $item.css('bottom', `${position * containerSize}px`);
        this.$scale.append($item);
      }

      return true;
    }

    const $itemMin = AbstractScale._createScaleItem();
    $itemMin.css('bottom', '0px');
    const $itemMax = AbstractScale._createScaleItem();
    $itemMax.css('bottom', `${containerSize}px`);
    this.$scale.append($itemMin, $itemMax);

    return true;
  }
}

export default VerticalSliderScale;
