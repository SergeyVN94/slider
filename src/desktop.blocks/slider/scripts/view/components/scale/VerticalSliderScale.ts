import AbstractScale from './AbstractScale';

class VerticalSliderScale extends AbstractScale {
  protected _getSliderSize(): number {
    return this.$slider.outerHeight();
  }

  protected _getItemSize($item: JQuery): number {
    return $item.outerHeight() + this.itemPaddings - 4;
  }

  protected _setItemPosition($item: JQuery, position: number, containerSize = 0): void {
    const offset = $item.outerHeight() / 2;
    const px = (position * (containerSize || this._getSliderSize())) - offset;
    $item.css('bottom', `${px}px`);
  }
}

export default VerticalSliderScale;
