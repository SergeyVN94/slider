import createScaleDriver from './scale-drivers/createScaleDriver';
import Core from './Core';

class Model implements ISliderModel, ISliderModelStateManager {
  private readonly updateEventCallbackList: HandlerModelUpdate[];

  private readonly core: Core;

  constructor(config: {
    scale: [number, number] | string[];
    start: number[] | string[];
    step: number;
  }) {
    const { scale, step, start } = config;
    this.core = new Core({ scaleDriver: createScaleDriver(scale), stepSize: step });
    this.core.values = start;
    this.updateEventCallbackList = [];
  }

  public update(targetPosition: number, pointSelected: number): void {
    this.core.updatePointSteps(targetPosition, pointSelected);
    this._toggleUpdateEvent();
  }

  public onUpdate(callback: HandlerModelUpdate): void {
    this.updateEventCallbackList.push(callback);
    this._toggleUpdateEvent();
  }

  public get values(): string[] | number[] {
    return this.core.values;
  }

  public set values(values: string[] | number[]) {
    this.core.values = values;
    this._toggleUpdateEvent();
  }

  public getPointPositions(): number[] {
    return this.core.getPointPositions();
  }

  public getScaleItems(): ScaleItem[] {
    return this.core.getScaleItems();
  }

  private _toggleUpdateEvent(): void {
    this.updateEventCallbackList.forEach(
      (callback) => callback(this.core.getPointPositions()),
    );
  }
}

export default Model;
