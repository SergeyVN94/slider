import HorizontalSliderPoint from '../components/slider-point/HorizontalSliderPoint';
import HorizontalPointContainer from '../components/point-container/HorizontalPointContainer';
import HorizontalSliderTooltip from '../components/tooltip/HorizontalSliderTooltip';
import HorizontalBgLine from '../components/bg-line/HorizontalBgLine';

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

  createBgLine(pointContainer: IPointContainer): IBgLine {
    return new HorizontalBgLine(pointContainer);
  },
};

export default HorizontalComponentsFactory;
