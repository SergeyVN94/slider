import Model from './model/Model';
import View from './view/View';
import Slider from './Slider';
import Presenter from './Presenter';

const initSlider = ($slider: JQuery, config: {
  readonly customScale?: string[];
  readonly min?: number;
  readonly max?: number;
  readonly values?: string[] | number[];
  readonly viewName?: ViewName;
  readonly tooltips?: boolean;
  readonly step?: number;
  readonly prettify?: PrettifyFunc;
  readonly bgLine?: boolean;
}): Slider => {
  const model = new Model({
    values: config.values,
    step: config.step,
    ...config,
  });

  const view = new View({
    $slider,
    pointsCount: model.values.length,
    scaleItems: model.getScaleItems(),
    ...config,
  });

  view.update(model.getPointsPositions(), model.values);

  new Presenter(view, model);

  return new Slider(view, model);
};

export default initSlider;
