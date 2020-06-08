import AbstractScale from './AbstractScale';

class HorizontalSliderScale extends AbstractScale {
  protected _getSliderSize(): number {
    return this.$slider.outerWidth();
  }

  protected _getItemSize($item: JQuery): number {
    return $item.outerWidth() + this.itemPaddings;
  }

  protected _setItemPosition($item: JQuery, position: number, containerSize = 0): void {
    const offset = $item.outerWidth() / 2;
    const px = (position * (containerSize || this._getSliderSize())) - offset;
    $item.css('left', `${px}px`);
  }
}

export default HorizontalSliderScale;
