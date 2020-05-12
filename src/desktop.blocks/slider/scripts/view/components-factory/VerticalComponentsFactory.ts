import VerticalSliderPoint from '../components/slider-point/VerticalSliderPoint';
import VerticalPointContainer from '../components/point-container/VerticalPointContainer';
import VerticalSliderTooltip from '../components/tooltip/VerticalSliderTooltip';
import VerticalBgLine from '../components/bg-line/VerticalBgLine';

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

  createBgLine(pointContainer: IPointContainer): IBgLine {
    return new VerticalBgLine(pointContainer);
  },
};

export default VerticalComponentsFactory;
