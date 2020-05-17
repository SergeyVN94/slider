import AbstractPointContainer from './AbstractPointContainer';

class HorizontalPointContainer extends AbstractPointContainer {
  public getTargetPosition(ev: JQuery.MouseEventBase): number {
    const absolutePosition = ev.pageX;
    const offset = this.$pointContainer.offset().left;
    const position = (absolutePosition - offset) / this.$pointContainer.outerWidth();

    if (position > 1) return 1;
    if (position < 0) return 0;

    return position;
  }
}

export default HorizontalPointContainer;
