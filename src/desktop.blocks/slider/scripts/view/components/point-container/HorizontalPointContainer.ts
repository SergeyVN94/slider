import AbstractPointContainer from './AbstractPointContainer';

class HorizontalPointContainer extends AbstractPointContainer {
  public getSize(): number {
    return this.$pointContainer.outerWidth();
  }

  public getTargetPosition(ev: JQuery.MouseEventBase): number {
    const absolutePosition = ev.pageX;
    const offset = this.$pointContainer.offset().left;
    const position = (absolutePosition - offset) / this.getSize();

    if (position > 1) return 1;
    if (position < 0) return 0;

    return position;
  }
}

export default HorizontalPointContainer;
