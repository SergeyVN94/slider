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

    this.components = createSlider({
      $slider,
      viewName,
      allPoints: points,
      maxStep: 0,
      stepSize: 1,
      stepToValue: null,
    });
    this.currentViewName = viewName;
    this.prettify = prettify;
    this.awaitingRedrawing = false;
    this.showTooltips = showTooltips;
    this.showBgLine = showBgLine;

    this.cache = {
      pointPositions: [],
      pointValues: [],
      maxStep: 0,
      stepSize: 1,
      stepToValue: null,
    };

    this._initController();
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

  private _recreateSlider(): void {
    this.components = createSlider({
      $slider: this.components.slider.getElement(),
      viewName: this.currentViewName,
      allPoints: this.cache.pointPositions.length,
      maxStep: this.cache.maxStep,
      stepSize: this.cache.stepSize,
      stepToValue: this.cache.stepToValue,
    });
  }

  public get showBgLine(): boolean {
    return !this.components.slider.getElement().hasClass(CLASSES.HIDE_BG_LINE);
  }

  public set showBgLine(state: boolean) {
    this.components.slider.getElement().toggleClass(CLASSES.HIDE_BG_LINE, !state);
  }

  public get showTooltips(): boolean {
    return !this.components.slider.getElement().hasClass(CLASSES.HIDE_TOOLTIPS);
  }

  public set showTooltips(state: boolean) {
    this.components.slider.getElement().toggleClass(CLASSES.HIDE_TOOLTIPS, !state);
  }

  public get viewName(): SliderViewName {
    return this.currentViewName;
  }

  public set viewName(viewName: SliderViewName) {
    this.currentViewName = viewName;
    this._recreateSlider();
    this._initController();
    this._requestRedrawing();
  }

  public onSelect(callback: (targetPosition: number, pointSelected: number) => void): void {
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
      this._recreateSlider();
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
