import getComponentsFactory from './components-factory/getComponentsFactory';
import CLASSES from './classes';

const createDefaultSlider = function createDefaultSlider(
  $slider: JQuery,
  componentsFactory: IComponentsFactory,
  allPoints: number,
): IViewComponents {
  const slider = componentsFactory.createSlider($slider);
  const points: IPoint[] = [];
  const tooltips: ITooltip[] = [];

  for (let i = 0; i < allPoints; i += 1) {
    const point = componentsFactory.createPoint(i);
    const tooltip = componentsFactory.createTooltip();
    points.push(point);
    tooltips.push(tooltip);
    $slider.append(point.getElement(), tooltip.getElement());
  }

  const bgLine = componentsFactory.createBgLine();
  $slider.append(bgLine.getElement());

  return {
    slider,
    points,
    tooltips,
    bgLine,
  };
};

const createSlider = function createSlider(
  $slider: JQuery,
  viewName: 'horizontal' | 'vertical' = 'horizontal',
  points: number,
): IViewComponents {
  const componentsFactory = getComponentsFactory(viewName);

  const isTooltipsHidden = $slider.hasClass(CLASSES.HIDE_TOOLTIPS);
  const isBgLineHidden = $slider.hasClass(CLASSES.HIDE_BG_LINE);

  // Эта функция должна возвращать полностью готовый к использованию сладер
  // По этому производится сброс сладера
  $slider
    .html('')
    .removeClass()
    .addClass(`slider js-slider slider_view-name_${viewName}`)
    .toggleClass(CLASSES.HIDE_TOOLTIPS, isTooltipsHidden)
    .toggleClass(CLASSES.HIDE_BG_LINE, isBgLineHidden);

  switch (viewName) {
    default:
      return createDefaultSlider($slider, componentsFactory, points);
  }
};

export default createSlider;
