import getComponentsFactory from './components-factory/getComponentsFactory';
import AbstractSlider from './components/slider/AbstractSlider';

const createSlider = function createSlider(options: {
  $slider: JQuery;
  viewName: 'horizontal' | 'vertical';
  allPoints: number;
  allSteps: number;
}): IViewComponents {
  const {
    $slider,
    viewName,
    allPoints,
    allSteps,
  } = options;

  // Эта функция должна возвращать полностью готовый к использованию сладер
  // Поэтому производится сброс сладера
  AbstractSlider.resetSlider($slider);

  const componentsFactory = getComponentsFactory(viewName);
  const slider = componentsFactory.createSlider($slider);
  const points: IPoint[] = [];
  const tooltips: ITooltip[] = [];

  for (let i = 0; i < allPoints; i += 1) {
    const point = componentsFactory.createPoint(i);
    const tooltip = componentsFactory.createTooltip();
    points.push(point);
    tooltips.push(tooltip);
    point.draw($slider);
    tooltip.draw($slider);
  }

  const bgLine = componentsFactory.createBgLine();
  bgLine.draw($slider);

  const scale = componentsFactory.createScale();
  scale.draw($slider);
  scale.setAllSteps(allSteps);

  return {
    slider,
    points,
    tooltips,
    bgLine,
    scale,
  };
};

export default createSlider;
