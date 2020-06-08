import VerticalSliderPoint from '../components/slider-point/VerticalSliderPoint';
import VerticalSliderTooltip from '../components/tooltip/VerticalSliderTooltip';
import VerticalBgLine from '../components/bg-line/VerticalBgLine';
import VerticalSlider from '../components/slider/VerticalSlider';
import VerticalSliderScale from '../components/scale/VerticalSliderScale';

const VerticalComponentsFactory: IComponentsFactory = {
  createSlider($slider: JQuery): ISlider {
    return new VerticalSlider($slider);
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

  createScale($slider: JQuery): IScale {
    return new VerticalSliderScale($slider);
  },
};

export default VerticalComponentsFactory;
