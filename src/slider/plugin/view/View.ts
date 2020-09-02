import DEFAULT_CONFIG from '../defaultConfig';
import Controller from './Controller';
import Slider from './components/Slider';
import Point from './components/Point';
import Tooltip from './components/Tooltip';
import BgLine from './components/BgLine';
import CLASSES from './classes';

interface IViewComponents {
  slider: Slider;
  points: Point[];
  tooltips: Tooltip[];
  bgLine: BgLine;
  scaleItems: JQuery[];
}

class View implements IView, IViewConfigManager {
  private readonly components: IViewComponents;

  private readonly pointsPositions: number[];

  private readonly prettify: PrettifyFunc;

  private readonly controller: Controller;

  private readonly $slider: JQuery;

  constructor(config: {
    $slider: JQuery;
    pointsCount?: number;
    tooltips?: boolean;
    bgLine?: boolean;
    viewName?: ViewName;
    prettify?: (value: number | string) => string;
    scaleItems?: ScaleItem[];
  }) {
    const {
      $slider,
      scaleItems = [],
      pointsCount = DEFAULT_CONFIG.pointsCount,
      tooltips = DEFAULT_CONFIG.tooltips,
      bgLine = DEFAULT_CONFIG.bgLine,
      prettify = DEFAULT_CONFIG.prettify,
      viewName = DEFAULT_CONFIG.viewName,
    } = config;

    this.$slider = $slider;
    this.prettify = prettify;
    this.pointsPositions = Array(pointsCount).fill(-1);

    Slider.resetSlider($slider);
    this.components = this.initSlider(viewName, scaleItems);
    this.controller = new Controller(this.components);

    this.areTooltipsVisible = tooltips;
    this.isBgLineVisible = bgLine;
  }

  public get isBgLineVisible(): boolean {
    return this.components.slider.isBgLineVisible;
  }

  public set isBgLineVisible(state: boolean) {
    this.components.slider.isBgLineVisible = state;
  }

  public get areTooltipsVisible(): boolean {
    return this.components.slider.areTooltipsVisible;
  }

  public set areTooltipsVisible(state: boolean) {
    this.components.slider.areTooltipsVisible = state;
  }

  public onPointPositionChange(callback: HandlerPointPositionChange): void {
    this.controller.onPointPositionChange(callback);
  }

  public update(pointsPositions: number[], pointValues: number[] | string[]): void {
    const lastIndex = pointsPositions.length - 1;
    const needToUpdateBgLine = pointsPositions[lastIndex] !== this.pointsPositions[lastIndex]
    || pointsPositions[0] !== this.pointsPositions[0];

    if (needToUpdateBgLine) {
      this.components.bgLine.update(
        pointsPositions[lastIndex],
        pointsPositions.length > 1 ? pointsPositions[0] : 0,
      );
    }

    let areValuesUpdated = false;

    pointsPositions.forEach((position, index) => {
      if (this.pointsPositions[index] === position) return;

      areValuesUpdated = true;

      this.pointsPositions[index] = position;
      this.components.points[index].setPosition(position);
      this.components.tooltips[index].setState(position, this.prettify(pointValues[index]));

      Point.handleCollisions(this.components.points, index);
      Tooltip.updateZIndexes(this.components.tooltips, this.components.points);
    });

    if (areValuesUpdated) this.components.slider.triggerPointMoveEvent(pointValues);
  }

  private initSlider(viewName: ViewName, scaleItems: ScaleItem[]): IViewComponents {
    const points: Point[] = [];
    const tooltips: Tooltip[] = [];

    for (let i = 0; i < this.pointsPositions.length; i += 1) {
      const point = new Point(this.$slider, i, viewName);
      const tooltip = new Tooltip(this.$slider, viewName);
      points.push(point);
      tooltips.push(tooltip);
    }

    const bgLine = new BgLine(this.$slider, viewName);
    if (this.pointsPositions.length === 1) bgLine.update(this.pointsPositions[0]);
    else bgLine.update(this.pointsPositions[this.pointsPositions.length - 1], this.pointsPositions[0]);

    return {
      bgLine,
      points,
      tooltips,
      slider: new Slider(this.$slider, viewName),
      scaleItems: this.drawScale(viewName, scaleItems),
    };
  }

  private drawScale(viewName: ViewName, scaleItems: ScaleItem[]): JQuery[] {
    const items: JQuery[] = [];

    scaleItems.forEach(({ position, value }) => {
      const $item = $('<div/>', {
        class: `${CLASSES.SCALE_ITEM} js-${CLASSES.SCALE_ITEM}`,
        'data-position': position,
        text: value,
      });

      this.$slider.append($item);
      items.push($item);

      $item.css(viewName === 'horizontal' ? 'left' : 'bottom', `${(position * 100)}%`);
    });

    return items;
  }
}

export default View;
