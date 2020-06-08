import AbstractScale from './AbstractScale';

class HorizontalSliderScale extends AbstractScale {
  protected _getScaleSize(): number {
    return this.$scale.outerWidth();
  }

  protected _getItemSize($item: JQuery): number {
    return $item.outerWidth() + this.itemPaddings;
  }

  protected _setItemPosition($item: JQuery, position: number, containerSize = 0): void {
    $item.css('left', `${position * (containerSize || this._getScaleSize())}px`);
  }
}

export default HorizontalSliderScale;
