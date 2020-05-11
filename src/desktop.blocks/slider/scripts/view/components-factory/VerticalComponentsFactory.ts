import VerticalSliderPoint from '../components/slider-point/VerticalSliderPoint';
import VerticalPointContainer from '../components/point-container/VerticalPointContainer';

const VerticalComponentsFactory: IComponentsFactory = {
  createPointContainer(): IPointContainer {
    return new VerticalPointContainer();
  },

  createPoint(index: number, pointContainer: IPointContainer): IPoint {
    return new VerticalSliderPoint(index, pointContainer);
  },
};

export default VerticalComponentsFactory;
