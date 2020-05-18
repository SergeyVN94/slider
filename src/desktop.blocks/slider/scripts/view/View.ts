import CLASSES from './classes';
import Controller from './Controller';
import createSlider from './createSlider';

const enum VIEW_NAMES {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

class View implements ISliderView, ISliderViewConfigManager {
  private awaitingRedrawing: boolean;

  private components: IViewComponents;

  private cache: IViewCache;

  private selectEventCallback: HandlerSliderViewSelect;

  private readonly prettify: PrettifyFunc;

  private currentViewName: 'horizontal' | 'vertical';

  private static redrawingTimeout = 1000 / 60;

  private controller: Controller;

  constructor(config: {
    $slider: JQuery;
    points?: number;
    showTooltips?: boolean;
    showBgLine?: boolean;
    viewName?: 'horizontal' | 'vertical';
    prettify?: (value: number | string) => string;
  }) {
    const {
      $slider,
      points = 1,
      showTooltips = true,
      showBgLine = true,
      prettify = (value: string): string => value,
      viewName = VIEW_NAMES.HORIZONTAL,
    } = config;

    this.components = createSlider($slider, viewName, points);
    this.currentViewName = viewName;
    this.prettify = prettify;
    this.awaitingRedrawing = false;
    this.showTooltips = showTooltips;
    this.showBgLine = showBgLine;

    this.cache = {
      pointPositions: [],
      pointValues: [],
    };

    this._initController();
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
      $slider,
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

    $slider.trigger('select', pointValues);
  }

  private _requestRedrawing(): void {
    if (!this.awaitingRedrawing) {
      this.awaitingRedrawing = true;

      setTimeout(() => {
        this._redrawAll();
        this.awaitingRedrawing = false;
      }, View.redrawingTimeout);
    }
  }

  private _initController(): void {
    this.controller = new Controller(this.components);
    this.controller.onSelect(this.selectEventCallback);
    this.controller.onResize(this._handleSliderResize.bind(this));
  }

  public get showBgLine(): boolean {
    return !this.components.$slider.hasClass(CLASSES.HIDE_BG_LINE);
  }

  public set showBgLine(state: boolean) {
    this.components.$slider.toggleClass(CLASSES.HIDE_BG_LINE, !state);
  }

  public get showTooltips(): boolean {
    return !this.components.$slider.hasClass(CLASSES.HIDE_TOOLTIPS);
  }

  public set showTooltips(state: boolean) {
    this.components.$slider.toggleClass(CLASSES.HIDE_TOOLTIPS, !state);
  }

  public get viewName(): SliderViewName {
    return this.currentViewName;
  }

  public set viewName(viewName: SliderViewName) {
    const { pointPositions } = this.cache;
    const { $slider } = this.components;

    this.currentViewName = viewName;
    this.components = createSlider(
      $slider,
      viewName,
      pointPositions.length,
    );
    this._initController();
    this._requestRedrawing();
  }

  public onSelect(callback: (targetPosition: number, pointSelected: number) => void): void {
    this.selectEventCallback = callback;
    this._initController();
  }

  public update(pointPositions: number[], pointValues: number[] | string[]): void {
    if (this.cache.pointPositions.length !== pointPositions.length) {
      this.components = createSlider(
        this.components.$slider,
        this.currentViewName,
        pointPositions.length,
      );
      this._initController();
    }

    this.cache = {
      pointPositions,
      pointValues,
    };

    this._requestRedrawing();
  }
}

export default View;
