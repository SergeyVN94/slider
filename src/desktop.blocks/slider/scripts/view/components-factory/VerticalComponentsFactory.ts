import VerticalSliderPoint from '../components/slider-point/VerticalSliderPoint';
import VerticalPointContainer from '../components/point-container/VerticalPointContainer';
import VerticalSliderTooltip from '../components/tooltip/VerticalSliderTooltip';

const VerticalComponentsFactory: IComponentsFactory = {
  createPointContainer(): IPointContainer {
    return new VerticalPointContainer();
  },

  createPoint(index: number, pointContainer: IPointContainer): IPoint {
    return new VerticalSliderPoint(index, pointContainer);
  },

  createTooltip($tooltipContainer: JQuery): ITooltip {
    return new VerticalSliderTooltip($tooltipContainer);
  },
};

export default VerticalComponentsFactory;
