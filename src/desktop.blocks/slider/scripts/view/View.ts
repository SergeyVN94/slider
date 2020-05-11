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

    this._initComponents();
    this._initEventListeners();
  }

  private _createComponents($slider: JQuery, allPoints = 1): ISliderComponents {
    const pointContainer = this.componentsFactory.createPointContainer();

    const points: IPoint[] = [];
    for (let i = 0; i < allPoints; i += 1) {
      points.push(this.componentsFactory.createPoint(i, pointContainer));
    }

    return {
      $slider,
      $document: $(document),
      pointContainer,
      points,
    };
  }

  private _initComponents(): void {
    const {
      $slider,
      pointContainer,
    } = this.components;

    $slider.append(pointContainer.getElement());
  }

  private _initEventListeners(): void {
    const { pointContainer } = this.components;

    pointContainer.onClick(this._handlePointContainerClick.bind(this));
  }

  private _handlePointContainerClick(position: number): void {
    this.updateEventCallback(position, View.POINT_NOT_SELECTED);
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
    const { $slider } = this.components;
    $slider.removeClass(
      (index, classes) => classes
        .split(' ')
        .filter((className) => className.includes('slider_view-name_'))
        .join(' '),
    );
    $slider.find('*').removeAttr('style');

    this.currentViewName = viewName;
    this.componentsFactory = new ComponentsFactory(viewName);
    this.components = this._createComponents($slider);
    this._initComponents();
    const {
      pointPositions,
      pointValues,
    } = this.cache;

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

    const { points } = this.components;

    points.forEach((point, index) => point.setPosition(pointPositions[index]));
  }
}

export default View;
