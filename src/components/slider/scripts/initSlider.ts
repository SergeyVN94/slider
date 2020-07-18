import Model from './domain-model/Model';
import View from './view/View';
import Slider from './Slider';
import Presenter from './Presenter';

const initSlider = function initSlider($slider: JQuery, config: {
  readonly scale?: SliderScale;
  readonly start?: string[] | number[];
  readonly viewName?: ViewName;
  readonly tooltips?: boolean;
  readonly step?: number;
  readonly prettify?: PrettifyFunc;
  readonly bgLine?: boolean;
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
    allPoints: start.length,
    scaleItems: model.getScaleItems(),
    ...config,
  });

  view.update(model.getPointPositions(), model.values);

  new Presenter(view, model);

  return new Slider(view, model);
};

export default initSlider;
