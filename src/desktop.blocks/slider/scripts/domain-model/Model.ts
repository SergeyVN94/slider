import createScaleDriver from './scale-drivers/createScaleDriver';
import Core from './Core';

class Model implements ISliderModel, ISliderModelStateManager {
  private readonly updateEventCallbackList: HandlerSliderModelUpdate[];

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

  public onUpdate(callback: HandlerSliderModelUpdate): void {
    this.updateEventCallbackList.push(callback);
    this._toggleUpdateEvent();
  }

  public get step(): number {
    return this.core.step;
  }

  public set step(newStepSize: number) {
    this.core.step = newStepSize;
    this._toggleUpdateEvent();
  }

  public get value(): string[] | number[] {
    return this.core.values;
  }

  public set value(values: string[] | number[]) {
    this.core.values = values;
    this._toggleUpdateEvent();
  }

  public getPointPositions(): number[] {
    return this.core.getPointPositions();
  }

  private _toggleUpdateEvent(): void {
    this.updateEventCallbackList.forEach(
      (callback) => callback(this.core.getPointPositions()),
    );
  }
}

export default Model;
