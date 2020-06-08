import HorizontalSliderPoint from '../components/slider-point/HorizontalSliderPoint';
import HorizontalSliderTooltip from '../components/tooltip/HorizontalSliderTooltip';
import HorizontalBgLine from '../components/bg-line/HorizontalBgLine';
import HorizontalSlider from '../components/slider/HorizontalSlider';
import HorizontalSliderScale from '../components/scale/HorizontalSliderScale';

const HorizontalComponentsFactory: IComponentsFactory = {
  createSlider($slider: JQuery): ISlider {
    return new HorizontalSlider($slider);
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

  createScale($slider: JQuery): IScale {
    return new HorizontalSliderScale($slider);
  },
};

export default HorizontalComponentsFactory;
