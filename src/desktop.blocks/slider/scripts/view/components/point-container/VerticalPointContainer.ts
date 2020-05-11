import AbstractPointContainer from './AbstractPointContainer';

class VerticalPointContainer extends AbstractPointContainer {
  public getSize(): number {
    return this.$pointContainer.outerHeight();
  }
}

export default VerticalPointContainer;
