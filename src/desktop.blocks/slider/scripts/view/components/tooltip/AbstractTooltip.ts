import CLASSES from '../../classes';

abstract class AbstractTooltip implements ITooltip {
  protected $tooltip: JQuery;

  constructor() {
    this.$tooltip = $('<div>', {
      class: CLASSES.TOOLTIP,
    });
  }

  public getElement(): JQuery {
    return this.$tooltip;
  }

  public abstract setState(position: number, value: string): void;
}

export default AbstractTooltip;
