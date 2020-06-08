import createScaleDriver from './scale-drivers/createScaleDriver';
import Core from './Core';

class Model implements ISliderModel, ISliderModelStateManager {
  private readonly updateEventCallbackList: HandlerSliderModelUpdate[];

  private readonly core: Core;

  private readonly scaleUpdateCallbackList: ((maxStep: number, stepSize: number) => void)[];

  constructor(config: {
    scale: [number, number] | string[];
    start: number[] | string[];
    step: number;
  }) {
    const { scale, step, start } = config;
    this.core = new Core({ scaleDriver: createScaleDriver(scale), stepSize: step });
    this.core.values = start;
    this.updateEventCallbackList = [];
    this.scaleUpdateCallbackList = [];
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
    this._toggleScaleUpdateEvent();
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

  public stepToValue(step: number): string {
    return this.core.stepToValue(step);
  }

  public onUpdateScale(callback: (maxStep: number, stepSize: number) => void): void {
    this.scaleUpdateCallbackList.push(callback);
    this._toggleScaleUpdateEvent();
  }

  private _toggleUpdateEvent(): void {
    this.updateEventCallbackList.forEach(
      (callback) => callback(this.core.getPointPositions()),
    );
  }

  private _toggleScaleUpdateEvent(): void {
    this.scaleUpdateCallbackList.forEach(
      (callback) => callback(this.core.getMaxStep(), this.core.step),
    );
  }
}

export default Model;
