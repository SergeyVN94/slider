import HorizontalComponentsFactory from './HorizontalComponentsFactory';
import VerticalComponentsFactory from './VerticalComponentsFactory';

class ComponentsFactory implements IComponentsFactory {
  private readonly concreteFactory: IComponentsFactory;

  constructor(viewName: 'horizontal' | 'vertical') {
    this.concreteFactory = ComponentsFactory._getConcreteFactory(viewName);
  }

  private static _getConcreteFactory(viewName: 'horizontal' | 'vertical'): IComponentsFactory {
    switch (viewName) {
      case 'vertical':
        return VerticalComponentsFactory;

      default:
        return HorizontalComponentsFactory;
    }
  }

  public createPointContainer(): IPointContainer {
    return this.concreteFactory.createPointContainer();
  }

  public createPoint(index: number, pointContainer: IPointContainer): IPoint {
    return this.concreteFactory.createPoint(index, pointContainer);
  }

  public createTooltip($tooltipContainer: JQuery): ITooltip {
    return this.concreteFactory.createTooltip($tooltipContainer);
  }

  public createBgLine(pointContainer: IPointContainer): IBgLine {
    return this.concreteFactory.createBgLine(pointContainer);
  }
}

export default ComponentsFactory;
