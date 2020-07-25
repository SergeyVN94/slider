import Controller from './Controller';
import Slider from './components/Slider';
import Point from './components/Point';
import Tooltip from './components/Tooltip';
import BgLine from './components/BgLine';
import CLASSES from './classes';

const enum VIEW_NAMES {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

interface IViewComponents {
  slider: Slider;
  points: Point[];
  tooltips: Tooltip[];
  bgLine: BgLine;
  scaleItems: JQuery[];
}

interface IViewCache {
  pointPositions: number[];
  pointValues: string[] | number[];
}

class View implements IView, IViewConfigManager {
  private readonly components: IViewComponents;

  private readonly cache: IViewCache;

  private readonly prettify: PrettifyFunc;

  private static readonly POINT_NOT_MOVED = -1;

  private indexMovedPoint: number;

  private readonly controller: Controller;

  private readonly $slider: JQuery;

  constructor(config: {
    $slider: JQuery;
    countPoints?: number;
    tooltips?: boolean;
    bgLine?: boolean;
    viewName?: ViewName;
    prettify?: (value: number | string) => string;
    scaleItems: ScaleItem[];
  }) {
    const {
      $slider,
      countPoints = 1,
      tooltips = true,
      bgLine = true,
      prettify = (value: string): string => value,
      viewName = VIEW_NAMES.HORIZONTAL,
      scaleItems,
    } = config;

    this.$slider = $slider;
    this.prettify = prettify;
    this.indexMovedPoint = 1;

    this.cache = {
      pointPositions: [],
      pointValues: [],
    };

    if (countPoints > 0) {
      for (let i = 0; i < countPoints; i += 1) this.cache.pointPositions.push(-1);
    } else {
      this.cache.pointPositions.push(-1);
      console.error(new Error('The number of points must be greater than zero'));
    }

    Slider.resetSlider($slider);
    this.components = this._initSlider(viewName, scaleItems);
    this.controller = new Controller(this.components);
    this.controller.onResize(this._handleSliderResize.bind(this));

    this.areTooltipsVisible = tooltips;
    this.areTooltipsVisible = bgLine;
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

  public onSelect(callback: HandlerViewSelect): void {
    this.controller.onSelect(callback);
  }

  public update(pointPositions: number[], pointValues: number[] | string[]): void {
    const {
      pointPositions: currentPositions,
      pointValues: currentValues,
    } = this.cache;

    const lastIndex = pointPositions.length - 1;
    const isNeedUpdateBgLine = pointPositions[lastIndex] !== currentPositions[lastIndex]
    || pointPositions[0] !== currentPositions[0];

    if (isNeedUpdateBgLine) {
      this.components.bgLine.update(
        pointPositions[lastIndex],
        pointPositions.length > 1 ? pointPositions[0] : 0,
      );
    }

    let isValuesUpdated = false;

    pointPositions.forEach((position, index) => {
      if (currentPositions[index] === position) return;

      isValuesUpdated = true;

      currentPositions[index] = position;
      currentValues[index] = pointValues[index];
      this.components.points[index].setPosition(position);
      this.components.tooltips[index].setState(position, this.prettify(pointValues[index]));

      Point.handleCollisions(this.components.points, index);
      Tooltip.updateZIndexes(this.components.tooltips, this.components.points);
    });

    if (isValuesUpdated) this.components.slider.triggerSelectEvent(pointValues);
  }

  private _handleSliderResize(): void {
    const {
      pointPositions,
      pointValues,
    } = this.cache;

    const { points, tooltips } = this.components;

    points.forEach((point, index) => point.setPosition(pointPositions[index]));
    tooltips.forEach((tooltip, index) => tooltip.setState(
      pointPositions[index],
      this.prettify(pointValues[index]),
    ));

    Point.handleCollisions(this.components.points, this.indexMovedPoint);
  }

  private _initSlider(viewName: ViewName, scaleItems: ScaleItem[]): IViewComponents {
    const { pointPositions, pointValues } = this.cache;

    const points: Point[] = [];
    const tooltips: Tooltip[] = [];

    for (let i = 0; i < pointPositions.length; i += 1) {
      const point = new Point(this.$slider, i, viewName);
      const tooltip = new Tooltip(this.$slider, viewName);
      point.setPosition(pointPositions[i]);
      tooltip.setState(pointPositions[i], this.prettify(pointValues[i]));
      points.push(point);
      tooltips.push(tooltip);
    }

    const bgLine = new BgLine(this.$slider, viewName);
    if (pointPositions.length === 1) bgLine.update(pointPositions[0]);
    else bgLine.update(pointPositions[pointPositions.length - 1], pointPositions[0]);

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
      });
      const $itemText = ($('<p>', {
        class: CLASSES.SCALE_ITEM_TEXT,
        text: value,
      }));

      this.$slider.append($item.append($itemText));
      items.push($item);

      const itemTextSize = (viewName === 'horizontal') ? $itemText.outerWidth() : $itemText.outerHeight();
      $itemText.css(viewName === 'horizontal' ? 'left' : 'bottom', `-${(itemTextSize / 2)}px`);
      $item.css(viewName === 'horizontal' ? 'left' : 'bottom', `${(position * 100)}%`);
    });

    return items;
  }
}

export default View;
