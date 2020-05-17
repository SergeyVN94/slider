import HorizontalComponentsFactory from './HorizontalComponentsFactory';
import VerticalComponentsFactory from './VerticalComponentsFactory';

const getComponentsFactory = function getComponentsFactory(
  viewName: 'horizontal' | 'vertical',
): IComponentsFactory {
  switch (viewName) {
    case 'vertical':
      return VerticalComponentsFactory;

    default:
      return HorizontalComponentsFactory;
  }
};

export default getComponentsFactory;
