import HorizontalSliderPoint from '../components/slider-point/HorizontalSliderPoint';
import HorizontalPointContainer from '../components/point-container/HorizontalPointContainer';

const HorizontalComponentsFactory: IComponentsFactory = {
  createPointContainer(): IPointContainer {
    return new HorizontalPointContainer();
  },

  createPoint(index: number, pointContainer: IPointContainer): IPoint {
    return new HorizontalSliderPoint(index, pointContainer);
  },
};

export default HorizontalComponentsFactory;
