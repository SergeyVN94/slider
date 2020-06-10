import Controller from './Controller';
import Slider from './components/Slider';
import Point from './components/Point';
import Tooltip from './components/Tooltip';
import BgLine from './components/BgLine';
import Scale from './components/Scale';

const enum VIEW_NAMES {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

class View implements ISliderView, ISliderViewConfigManager {
  private awaitingRedrawing: boolean;

  private components: {
    slider: Slider;
    points: Point[];
    tooltips: Tooltip[];
    bgLine: BgLine;
    scale: Scale;
  };

  private readonly cache: IViewCache;

  private selectEventCallback: HandlerSliderViewSelect;

  private readonly prettify: PrettifyFunc;

  private currentViewName: SliderViewName;

  private static redrawingTimeout = 1000 / 60;

  private controller: Controller;

  private $slider: JQuery;

  constructor(config: {
    $slider: JQuery;
    points?: number;
    showTooltips?: boolean;
    showBgLine?: boolean;
    viewName?: SliderViewName;
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

    this.$slider = $slider;
    this.currentViewName = viewName;
    this.prettify = prettify;
    this.awaitingRedrawing = false;

    this.cache = {
      pointPositions: [],
      pointValues: [],
      maxStep: 0,
      stepSize: 1,
      stepToValue: null,
    };

    // при инициализации сладера нужно будет знать количество кругляшей на слайдере.
    // Это число получается из pointPositions.length
    for (let i = 0; i < points; i += 1) this.cache.pointPositions.push(0);

    this._initSlider();
    this._initController();

    this.showTooltips = showTooltips;
    this.showBgLine = showBgLine;
  }

  private _handleSliderResize(): void {
    const {
      pointPositions,
      pointValues,
    } = this.cache;

    this.update(pointPositions, pointValues);
    this.components.scale.redraw();
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

    slider.getElement().trigger('select', pointValues);
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

  private _initSlider(): void {
    const slider = new Slider(this.$slider, this.currentViewName);
    const bgLine = new BgLine(this.$slider, this.currentViewName);

    const points: Point[] = [];
    const tooltips: Tooltip[] = [];

    for (let i = 0; i < this.cache.pointPositions.length; i += 1) {
      const point = new Point(this.$slider, i, this.currentViewName);
      const tooltip = new Tooltip(this.$slider, this.currentViewName);
      points.push(point);
      tooltips.push(tooltip);
    }

    const scale = new Scale(this.$slider, this.currentViewName);
    scale.setMaxStep(this.cache.maxStep);
    scale.setStepSize(this.cache.stepSize);
    scale.onStepToValue(this.cache.stepToValue);

    this.components = {
      slider,
      bgLine,
      points,
      tooltips,
      scale,
    };
  }

  public get showBgLine(): boolean {
    return this.components.slider.showBgLine;
  }

  public set showBgLine(state: boolean) {
    this.components.slider.showBgLine = this.showBgLine;
  }

  public get showTooltips(): boolean {
    return this.components.slider.showTooltips;
  }

  public set showTooltips(state: boolean) {
    this.components.slider.showTooltips = state;
  }

  public get viewName(): SliderViewName {
    return this.currentViewName;
  }

  public set viewName(viewName: SliderViewName) {
    this.currentViewName = viewName;
    this._initSlider();
    this._initController();
    this._requestRedrawing();
  }

  public onSelect(callback: HandlerSliderViewSelect): void {
    this.selectEventCallback = callback;
    if (this.controller) {
      this.controller.onSelect(callback);
    } else {
      this._initController();
    }
  }

  public update(pointPositions: number[], pointValues: number[] | string[]): void {
    const isNeedRecreateSlider = this.cache.pointPositions.length !== pointPositions.length;

    this.cache.pointPositions = pointPositions;
    this.cache.pointValues = pointValues;

    if (isNeedRecreateSlider) {
      this._initSlider();
      this._initController();
    }

    this._requestRedrawing();
  }

  public updateScale(maxStep: number, stepSize: number): void {
    if (maxStep !== this.cache.maxStep) {
      this.cache.maxStep = maxStep;
      this.components.scale.setMaxStep(maxStep);
    }

    if (stepSize !== this.cache.stepSize) {
      this.cache.stepSize = stepSize;
      this.components.scale.setStepSize(stepSize);
    }
  }

  public onStepToValue(callback: HandlerStepToValueEvent): void {
    this.cache.stepToValue = callback;
    this.components.scale.onStepToValue(callback);
  }
}

export default View;
