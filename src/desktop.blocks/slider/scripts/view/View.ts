import CLASSES from './classes';
import getComponentsFactory from './components-factory/getComponentsFactory';
import Controller from './Controller';

const enum VIEW_NAMES {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

class View implements ISliderView, ISliderViewConfigManager {
  private flags: {
    showTooltips: boolean;
    showBgLine: boolean;
    awaitingRedrawing: boolean;
  };

  private components: IViewComponents;

  private componentsFactory: IComponentsFactory;

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

    this.componentsFactory = getComponentsFactory(viewName);
    this.components = this._createComponents($slider, points);
    this.currentViewName = viewName;
    this.prettify = prettify;

    this.flags = {
      showTooltips,
      showBgLine,
      awaitingRedrawing: false,
    };
    this.cache = {
      pointPositions: [],
      pointValues: [],
    };

    this._initController();
    this._initComponents(viewName);
  }

  private _createComponents($slider: JQuery, allPoints = 1): IViewComponents {
    const pointContainer = this.componentsFactory.createPointContainer();

    const points: IPoint[] = [];
    for (let i = 0; i < allPoints; i += 1) {
      points.push(this.componentsFactory.createPoint(i));
    }

    const $tooltipContainer = $('<div/>', {
      class: `${CLASSES.TOOLTIP_CONTAINER} js-${CLASSES.TOOLTIP_CONTAINER}`,
    });

    const tooltips: ITooltip[] = [];
    for (let i = 0; i < allPoints; i += 1) {
      tooltips.push(this.componentsFactory.createTooltip());
    }

    const bgLine = this.componentsFactory.createBgLine();

    return {
      $slider,
      pointContainer,
      points,
      $tooltipContainer,
      tooltips,
      bgLine,
    };
  }

  private _initComponents(viewName: 'horizontal' | 'vertical'): void {
    const {
      $slider,
      pointContainer,
      $tooltipContainer,
      bgLine,
      points,
      tooltips,
    } = this.components;

    if (viewName !== VIEW_NAMES.HORIZONTAL) {
      $slider.addClass(`slider_view-name_${viewName}`);
    }

    const $pointContainer = pointContainer.getElement();
    points.forEach((point) => $pointContainer.append(point.getElement()));
    $pointContainer.append(bgLine.getElement());

    tooltips.forEach((tooltip) => $tooltipContainer.append(tooltip.getElement()));

    $slider
      .append($pointContainer)
      .append($tooltipContainer);
  }

  private resetSlider(): void {
    const { $slider } = this.components;

    $slider
      .removeClass(
        (index, classes) => classes
          .split(' ')
          .filter((className) => className.includes('slider_view-name_'))
          .join(' '),
      )
      .html('');
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
    if (!this.flags.awaitingRedrawing) {
      this.flags.awaitingRedrawing = true;

      setTimeout(() => {
        this._redrawAll();
        this.flags.awaitingRedrawing = false;
      }, View.redrawingTimeout);
    }
  }

  private _initController(): void {
    this.controller = new Controller(this.components);
    this.controller.onSelect(this.selectEventCallback);
    this.controller.onResize(this._handleSliderResize.bind(this));
  }

  public get showBgLine(): boolean {
    return this.flags.showBgLine;
  }

  public set showBgLine(state: boolean) {
    this.flags.showBgLine = state;
    this.components.$slider.toggleClass(CLASSES.HIDE_BG_LINE, !state);
  }

  public get showTooltips(): boolean {
    return this.flags.showTooltips;
  }

  public set showTooltips(state: boolean) {
    this.flags.showTooltips = state;
    this.components.$slider.toggleClass(CLASSES.HIDE_TOOLTIPS, !state);
  }

  public get viewName(): SliderViewName {
    return this.currentViewName;
  }

  public set viewName(viewName: SliderViewName) {
    const { pointPositions } = this.cache;

    this.currentViewName = viewName;
    this.resetSlider();
    this.componentsFactory = getComponentsFactory(viewName);
    this.components = this._createComponents(this.components.$slider, pointPositions.length);
    this._initComponents(viewName);

    this._requestRedrawing();
  }

  public onSelect(callback: (targetPosition: number, pointSelected: number) => void): void {
    this.selectEventCallback = callback;
    this._initController();
  }

  public update(pointPositions: number[], pointValues: number[] | string[]): void {
    if (this.cache.pointPositions.length !== pointPositions.length) {
      this.resetSlider();
      this.components = this._createComponents(this.components.$slider, pointPositions.length);
      this._initController();
      this._initComponents(this.currentViewName);
    }

    this.cache = {
      pointPositions,
      pointValues,
    };

    this._requestRedrawing();
  }
}

export default View;
