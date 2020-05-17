import HorizontalSliderPoint from '../components/slider-point/HorizontalSliderPoint';
import HorizontalPointContainer from '../components/point-container/HorizontalPointContainer';
import HorizontalSliderTooltip from '../components/tooltip/HorizontalSliderTooltip';
import HorizontalBgLine from '../components/bg-line/HorizontalBgLine';

const HorizontalComponentsFactory: IComponentsFactory = {
  createPointContainer(): IPointContainer {
    return new HorizontalPointContainer();
  },

  createPoint(index: number): IPoint {
    return new HorizontalSliderPoint(index);
  },

  createTooltip(): ITooltip {
    return new HorizontalSliderTooltip();
  },

  createBgLine(): IBgLine {
    return new HorizontalBgLine();
  },
};

export default HorizontalComponentsFactory;
