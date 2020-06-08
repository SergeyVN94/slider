import AbstractScale from './AbstractScale';

class VerticalSliderScale extends AbstractScale {
  protected _getScaleSize(): number {
    return this.$scale.outerHeight();
  }

  protected _getItemSize($item: JQuery): number {
    return $item.outerHeight() + this.itemPaddings;
  }

  protected _setItemPosition($item: JQuery, position: number, containerSize = 0): void {
    $item.css('bottom', `${position * (containerSize || this._getScaleSize())}px`);
  }
}

export default VerticalSliderScale;
