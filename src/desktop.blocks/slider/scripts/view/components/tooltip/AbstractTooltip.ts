import CLASSES from '../../classes';

abstract class AbstractTooltip implements ITooltip {
  protected $tooltipContainer: JQuery;

  protected $tooltip: JQuery;

  constructor($tooltipContainer: JQuery) {
    this.$tooltipContainer = $tooltipContainer;
    this.$tooltip = $('<div>', {
      class: CLASSES.TOOLTIP,
    });

    $tooltipContainer.append(this.$tooltip);
  }

  public getElement(): JQuery {
    return this.$tooltip;
  }

  public abstract setState(position: number, value: string): void;
}

export default AbstractTooltip;
