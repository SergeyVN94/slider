import getComponentsFactory from './components-factory/getComponentsFactory';
import AbstractSlider from './components/slider/AbstractSlider';

const createSlider = function createSlider(
  $slider: JQuery,
  viewName: 'horizontal' | 'vertical' = 'horizontal',
  allPoints: number,
): IViewComponents {
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

  return {
    slider,
    points,
    tooltips,
    bgLine,
  };
};

export default createSlider;
