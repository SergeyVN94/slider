import AbstractPointContainer from './AbstractPointContainer';

class HorizontalPointContainer extends AbstractPointContainer {
  public getSize(): number {
    return this.$pointContainer.outerWidth();
  }
}

export default HorizontalPointContainer;
