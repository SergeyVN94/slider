import Controller from './Controller';
import Slider from './components/Slider';
import Point from './components/Point';
import Tooltip from './components/Tooltip';
import BgLine from './components/BgLine';
import Scale from './components/Scale';
import {
  IView,
  IViewComponents,
  PrettifyFunc,
  ViewConfig,
  ViewName,
  PointState,
  HandlerPointPositionChange,
  VIEW_HORIZONTAL,
} from './types';

class View implements IView {
  private readonly components: IViewComponents;

  private readonly prettify: PrettifyFunc | null;

  private readonly controller: Controller;

  private readonly container: HTMLElement;

  constructor(config: ViewConfig) {
    const {
      container,
      scaleItems = [],
      pointsCount,
      tooltips = true,
      bgLine = true,
      prettify = (value: string | number) => String(value),
      viewName = VIEW_HORIZONTAL,
    } = config;

    this.container = container;
    this.prettify = prettify;
    this.components = View.createComponents(viewName, scaleItems, pointsCount);
    this.container.innerHTML = '';
    this.draw(container);
    this.controller = new Controller(this.components);
  }

  public onPointPositionChange(callback: HandlerPointPositionChange): void {
    this.controller.onPointPositionChange(callback);
  }

  public update(pointsStates: PointState[]): void {
    const { points, tooltips, bgLine } = this.components;

    pointsStates.forEach((state, index) => {
      points[index].update(state.position);
      tooltips[index].update(state.position, this.prettify(state.value));
    });

    bgLine.update(
      pointsStates.slice(-1).pop().position,
      pointsStates.length > 1 ? pointsStates[0].position : 0,
    );
  }

  private static createComponents(
    viewName: ViewName,
    scaleItems: PointState[],
    pointsCount: number,
  ): IViewComponents {
    const slider = new Slider(viewName);

    const points: Point[] = [];
    const tooltips: Tooltip[] = [];

    for (let i = 0; i < pointsCount; i += 1) {
      const point = new Point(i, viewName);
      const tooltip = new Tooltip(viewName);
      points.push(point);
      tooltips.push(tooltip);
    }

    return {
      slider,
      points,
      tooltips,
      bgLine: new BgLine(viewName),
      scale: new Scale(scaleItems, viewName),
    };
  }

  private draw(container: HTMLElement): void {
    const {
      slider,
      points,
      tooltips,
      bgLine,
      scale,
    } = this.components;

    points.forEach((point) => point.draw(slider.getElement()));
    tooltips.forEach((tooltip) => tooltip.draw(slider.getElement()));
    bgLine.draw(slider.getElement());
    scale.draw(slider.getElement());

    container.appendChild(slider.getElement());
  }
}

export default View;
