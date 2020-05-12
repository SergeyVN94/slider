import AbstractPointContainer from './AbstractPointContainer';

class VerticalPointContainer extends AbstractPointContainer {
  public getSize(): number {
    return this.$pointContainer.outerHeight();
  }

  public getTargetPosition(ev: JQuery.MouseEventBase): number {
    const absolutePosition = ev.pageY;
    const offset = this.$pointContainer.offset().top;
    let position = (absolutePosition - offset) / this.getSize();

    if (position > 1) position = 1;
    if (position < 0) position = 0;

    return 1 - position;
  }
}

export default VerticalPointContainer;