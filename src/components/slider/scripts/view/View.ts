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
  private isPendingRedrawing: boolean;

  private readonly components: IViewComponents;

  private readonly cache: IViewCache;

  private readonly prettify: PrettifyFunc;

  private static readonly REDRAWING_TIMEOUT = 1000 / 60;

  private readonly controller: Controller;

  private readonly $slider: JQuery;

  constructor(config: {
    $slider: JQuery;
    allPoints?: number;
    tooltips?: boolean;
    bgLine?: boolean;
    viewName?: ViewName;
    prettify?: (value: number | string) => string;
    scaleItems: ScaleItem[];
  }) {
    const {
      $slider,
      allPoints = 1,
      tooltips = true,
      bgLine = true,
      prettify = (value: string): string => value,
      viewName = VIEW_NAMES.HORIZONTAL,
      scaleItems,
    } = config;

    this.$slider = $slider;
    this.prettify = prettify;
    this.isPendingRedrawing = false;

    this.cache = {
      pointPositions: [],
      pointValues: [],
    };

    // при инициализации сладера нужно будет знать количество кругляшей на слайдере.
    for (let i = 0; i < allPoints; i += 1) this.cache.pointPositions.push(0);

    this.components = this._initSlider(viewName, scaleItems);
    this.controller = new Controller(this.components);
    this.controller.onResize(this._handleSliderResize.bind(this));

    this.areTooltipsVisible = tooltips;
    this.areTooltipsVisible = bgLine;
  }

  public get areBgLineVisible(): boolean {
    return this.components.slider.areBgLineVisible;
  }

  public set areBgLineVisible(state: boolean) {
    this.components.slider.areBgLineVisible = state;
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
    this.cache.pointPositions = pointPositions;
    this.cache.pointValues = pointValues;
    this._requestRedrawing();
  }

  private _handleSliderResize(): void {
    const {
      pointPositions,
      pointValues,
    } = this.cache;

    this.update(pointPositions, pointValues);
  }

  private _redrawAll(): void {
    const {
      pointPositions,
      pointValues,
    } = this.cache;

    const {
      points,
      tooltips,
      slider,
      bgLine,
    } = this.components;

    points.forEach((point, index) => point.setPosition(pointPositions[index]));
    tooltips.forEach((tooltip, index) => tooltip.setState(
      pointPositions[index],
      this.prettify(pointValues[index]),
    ));

    const bgLineMax = pointPositions[pointPositions.length - 1];
    const bgLineMin = pointPositions.length > 1 ? pointPositions[0] : 0;
    bgLine.update(bgLineMax, bgLineMin);

    slider.triggerSelectEvent(pointValues);
  }

  private _requestRedrawing(): void {
    if (!this.isPendingRedrawing) {
      this.isPendingRedrawing = true;

      setTimeout(() => {
        this._redrawAll();
        this.isPendingRedrawing = false;
      }, View.REDRAWING_TIMEOUT);
    }
  }

  private _initSlider(viewName: ViewName, scaleItems: ScaleItem[]): IViewComponents {
    Slider.resetSlider(this.$slider);

    const points: Point[] = [];
    const tooltips: Tooltip[] = [];

    for (let i = 0; i < this.cache.pointPositions.length; i += 1) {
      const point = new Point(this.$slider, i, viewName);
      const tooltip = new Tooltip(this.$slider, viewName);
      points.push(point);
      tooltips.push(tooltip);
    }

    return {
      slider: new Slider(this.$slider, viewName),
      bgLine: new BgLine(this.$slider, viewName),
      points,
      tooltips,
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
