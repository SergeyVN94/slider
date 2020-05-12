import CLASSES from './classes';
import ComponentsFactory from './components-factory/ComponentsFactory';

const enum VIEW_NAMES {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

class View implements ISliderView, ISliderViewConfigManager {
  private flags: {
    showTooltips: boolean;
    showBgLine: boolean;
  };

  private components: ISliderComponents;

  private componentsFactory: IComponentsFactory;

  private cache: IViewCache;

  private updateEventCallback: HandlerSliderViewSelect;

  private pointSelected: number;

  private readonly prettify: PrettifyFunc;

  private currentViewName: 'horizontal' | 'vertical';

  private static POINT_NOT_SELECTED = -1;

  private handleDocumentMousemove: (ev: JQuery.MouseMoveEvent) => void;

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

    this.componentsFactory = new ComponentsFactory(viewName);
    this.components = this._createComponents($slider, points);
    this.currentViewName = viewName;
    this.pointSelected = View.POINT_NOT_SELECTED;
    this.updateEventCallback = null;
    this.prettify = prettify;

    this.flags = {
      showTooltips,
      showBgLine,
    };
    this.cache = {
      pointPositions: [],
      pointValues: [],
    };

    this._initComponents(viewName);
    this._initEventListeners();
  }

  private _createComponents($slider: JQuery, allPoints = 1): ISliderComponents {
    const pointContainer = this.componentsFactory.createPointContainer();

    const points: IPoint[] = [];
    for (let i = 0; i < allPoints; i += 1) {
      points.push(this.componentsFactory.createPoint(i, pointContainer));
    }

    const $tooltipContainer = $('<div/>', {
      class: `${CLASSES.TOOLTIP_CONTAINER} js-${CLASSES.TOOLTIP_CONTAINER}`,
    });

    const tooltips: ITooltip[] = [];
    for (let i = 0; i < allPoints; i += 1) {
      tooltips.push(this.componentsFactory.createTooltip($tooltipContainer));
    }

    return {
      $slider,
      $document: $(document),
      pointContainer,
      points,
      $tooltipContainer,
      tooltips,
    };
  }

  private _initComponents(viewName: 'horizontal' | 'vertical'): void {
    const {
      $slider,
      pointContainer,
      $tooltipContainer,
    } = this.components;

    if (viewName !== VIEW_NAMES.HORIZONTAL) {
      $slider.addClass(`slider_view-name_${viewName}`);
    }

    $slider
      .append(pointContainer.getElement())
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

  private _initEventListeners(): void {
    const {
      pointContainer,
      points,
      $document,
    } = this.components;

    this.handleDocumentMousemove = this._handleDocumentMousemove.bind(this);

    pointContainer.onClick(this._handlePointContainerClick.bind(this));
    points.forEach((point) => point.onMousedown(this._handlePointMousedown.bind(this)));
    $document.on('mouseup', this._handleDocumentMouseup.bind(this));
  }

  private _handlePointContainerClick(position: number): void {
    if (this.pointSelected === View.POINT_NOT_SELECTED) {
      this.updateEventCallback(position, View.POINT_NOT_SELECTED);
    }
  }

  private _handlePointMousedown(index: number): void {
    this.pointSelected = index;
    this.components.$document.on('mousemove', this.handleDocumentMousemove);
  }

  private _handleDocumentMouseup(): void {
    this.components.$document.off('mousemove', this.handleDocumentMousemove);
    this.pointSelected = View.POINT_NOT_SELECTED;
  }

  private _handleDocumentMousemove(ev: JQuery.MouseMoveEvent): void {
    const targetPosition = this.components.pointContainer.getTargetPosition(ev);
    this.updateEventCallback(targetPosition, this.pointSelected);
  }

  public get showBgLine(): boolean {
    return this.flags.showBgLine;
  }

  public set showBgLine(state: boolean) {
    this.flags.showBgLine = state;
  }

  public get showTooltips(): boolean {
    return this.flags.showTooltips;
  }

  public set showTooltips(state: boolean) {
    this.flags.showTooltips = state;
  }

  public get viewName(): SliderViewName {
    return this.currentViewName;
  }

  public set viewName(viewName: SliderViewName) {
    const {
      pointPositions,
      pointValues,
    } = this.cache;

    this.currentViewName = viewName;
    this.resetSlider();
    this.componentsFactory = new ComponentsFactory(viewName);
    this.components = this._createComponents(this.components.$slider, pointPositions.length);
    this._initComponents(viewName);
    this._initEventListeners();

    this.update(pointPositions, pointValues);
  }

  public onSelect(callback: (targetPosition: number, pointSelected: number) => void): void {
    this.updateEventCallback = callback;
  }

  public update(pointPositions: number[], pointValues: number[] | string[]): void {
    this.cache = {
      pointPositions,
      pointValues,
    };

    const {
      points,
      tooltips,
      $slider,
    } = this.components;

    points.forEach((point, index) => point.setPosition(pointPositions[index]));
    tooltips.forEach((tooltip, index) => tooltip.setState(
      pointPositions[index],
      this.prettify(pointValues[index]),
    ));

    $slider.trigger('select', pointValues);
  }
}

export default View;
