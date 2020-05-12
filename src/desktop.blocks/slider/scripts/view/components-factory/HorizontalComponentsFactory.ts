import HorizontalSliderPoint from '../components/slider-point/HorizontalSliderPoint';
import HorizontalPointContainer from '../components/point-container/HorizontalPointContainer';
import HorizontalSliderTooltip from '../components/tooltip/HorizontalSliderTooltip';

const HorizontalComponentsFactory: IComponentsFactory = {
  createPointContainer(): IPointContainer {
    return new HorizontalPointContainer();
  },

  createPoint(index: number, pointContainer: IPointContainer): IPoint {
    return new HorizontalSliderPoint(index, pointContainer);
  },

  createTooltip($tooltipContainer: JQuery): ITooltip {
    return new HorizontalSliderTooltip($tooltipContainer);
  },
};

export default HorizontalComponentsFactory;
