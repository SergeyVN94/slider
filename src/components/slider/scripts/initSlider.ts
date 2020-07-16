import Model from './domain-model/Model';
import View from './view/View';
import Slider from './Slider';
import Presenter from './Presenter';

const initSlider = function initSlider($slider: JQuery, config: {
  readonly scale?: SliderScale;
  readonly start?: string[] | number[];
  readonly viewName?: SliderViewName;
  readonly showTooltips?: boolean;
  readonly step?: number;
  readonly prettify?: PrettifyFunc;
  readonly showBgLine?: boolean;
}): Slider {
  const {
    scale,
    step,
    start,
  } = config;

  const model = new Model({
    start,
    scale,
    step,
  });

  const view = new View({
    $slider,
    points: start.length,
    scaleItems: model.getScaleItems(),
    ...config,
  });

  new Presenter(view, model);

  return new Slider(view, model);
};

export default initSlider;
