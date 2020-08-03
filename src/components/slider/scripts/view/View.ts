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

  private readonly pointPositions: number[];

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

    this.pointPositions = [];

    if (pointsCount > 0) for (let i = 0; i < pointsCount; i += 1) this.pointPositions.push(-1);
    else {
      this.pointPositions.push(-1);
      console.error(new Error('The number of points must be greater than zero'));
    }

    Slider.resetSlider($slider);
    this.components = this._initSlider(viewName, scaleItems);
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

  public onThumbPositionChange(callback: HandlerThumbPositionChange): void {
    this.controller.onThumbPositionChange(callback);
  }

  public update(pointPositions: number[], pointValues: number[] | string[]): void {
    const lastIndex = pointPositions.length - 1;
    const isNeedingUpdateBgLine = pointPositions[lastIndex] !== this.pointPositions[lastIndex]
    || pointPositions[0] !== this.pointPositions[0];

    if (isNeedingUpdateBgLine) {
      this.components.bgLine.update(
        pointPositions[lastIndex],
        pointPositions.length > 1 ? pointPositions[0] : 0,
      );
    }

    let areValuesUpdated = false;

    pointPositions.forEach((position, index) => {
      if (this.pointPositions[index] === position) return;

      areValuesUpdated = true;

      this.pointPositions[index] = position;
      this.components.points[index].setPosition(position);
      this.components.tooltips[index].setState(position, this.prettify(pointValues[index]));

      Point.handleCollisions(this.components.points, index);
      Tooltip.updateZIndexes(this.components.tooltips, this.components.points);
    });

    if (areValuesUpdated) this.components.slider.triggerThumbMoveEvent(pointValues);
  }

  private _initSlider(viewName: ViewName, scaleItems: ScaleItem[]): IViewComponents {
    const points: Point[] = [];
    const tooltips: Tooltip[] = [];

    for (let i = 0; i < this.pointPositions.length; i += 1) {
      const point = new Point(this.$slider, i, viewName);
      const tooltip = new Tooltip(this.$slider, viewName);
      points.push(point);
      tooltips.push(tooltip);
    }

    const bgLine = new BgLine(this.$slider, viewName);
    if (this.pointPositions.length === 1) bgLine.update(this.pointPositions[0]);
    else bgLine.update(this.pointPositions[this.pointPositions.length - 1], this.pointPositions[0]);

    return {
      bgLine,
      points,
      tooltips,
      slider: new Slider(this.$slider, viewName),
      scaleItems: this._drawScale(viewName, scaleItems),
    };
  }

  private _drawScale(viewName: ViewName, scaleItems: ScaleItem[]): JQuery[] {
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
