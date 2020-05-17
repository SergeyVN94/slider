import VerticalSliderPoint from '../components/slider-point/VerticalSliderPoint';
import VerticalPointContainer from '../components/point-container/VerticalPointContainer';
import VerticalSliderTooltip from '../components/tooltip/VerticalSliderTooltip';
import VerticalBgLine from '../components/bg-line/VerticalBgLine';

const VerticalComponentsFactory: IComponentsFactory = {
  createPointContainer(): IPointContainer {
    return new VerticalPointContainer();
  },

  createPoint(index: number): IPoint {
    return new VerticalSliderPoint(index);
  },

  createTooltip(): ITooltip {
    return new VerticalSliderTooltip();
  },

  createBgLine(): IBgLine {
    return new VerticalBgLine();
  },
};

export default VerticalComponentsFactory;
