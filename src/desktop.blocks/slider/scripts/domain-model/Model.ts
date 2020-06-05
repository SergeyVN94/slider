import driverScaleNumberRange from './scale-drivers/driverScaleNumberRange';
import driverScaleStringArray from './scale-drivers/driverScaleStringArray';
import DataManager from './DataManager';
import Core from './Core';
import {
  getModelValues,
  isCorrectSteps,
  getPointPositions,
} from './lib';

const createSliderScale = function sliderScaleFactory(scale: SliderScale): ISliderScaleDriver {
  if (typeof scale[0] === 'number') {
    return driverScaleNumberRange;
  }

  return driverScaleStringArray;
};

class Model implements ISliderModel, ISliderModelStateManager {
  private readonly dataManager: IDataGateway;

  private readonly updateEventCallbackList: HandlerSliderModelUpdate[];

  private readonly scaleDriver: ISliderScaleDriver;

  private callbackChangeAllSteps: (allSteps: number) => void;

  constructor(config: {
    scale: [number, number] | string[];
    start: number[] | string[];
    step: number;
  }) {
    const {
      scale,
      start,
      step: stepSize,
    } = config;

    this.scaleDriver = createSliderScale(scale);

    this.dataManager = new DataManager({
      scale,
      pointSteps: [],
      stepSize,
      steps: this.scaleDriver.getAllSteps(scale, stepSize),
    });

    const pointSteps: number[] = [];
    start.forEach((startValue: string | number) => pointSteps.push(
      this.scaleDriver.valueToStep(startValue, this.dataManager),
    ));

    this.dataManager.pointSteps = pointSteps;

    this.updateEventCallbackList = [];

    this.callbackChangeAllSteps = null;
  }

  public onChangeAllSteps(callback: (allSteps: number) => void): void {
    this.callbackChangeAllSteps = callback;
    callback(this.dataManager.steps);
  }

  public update(targetPosition: number, pointSelected: number): void {
    Core.updatePointSteps(
      targetPosition,
      pointSelected,
      this.dataManager,
    );
    this._toggleUpdateEvent();
  }

  public onUpdate(callback: HandlerSliderModelUpdate): void {
    this.updateEventCallbackList.push(callback);
  }

  public get step(): number {
    return this.dataManager.stepSize;
  }

  public set step(newStepSize: number) {
    const values = getModelValues(this.dataManager, this.scaleDriver);
    const { scale } = this.dataManager;

    if (this.scaleDriver.isCorrectStepSize(scale, newStepSize)) {
      this.dataManager.stepSize = newStepSize;
      this.dataManager.steps = this.scaleDriver.getAllSteps(scale, newStepSize);
      this.value = values;
      this._toggleUpdateEvent();

      if (this.callbackChangeAllSteps) {
        this.callbackChangeAllSteps(this.dataManager.steps);
      }
    }
  }

  public get value(): string[] | number[] {
    return getModelValues(this.dataManager, this.scaleDriver);
  }

  public set value(values: string[] | number[]) {
    if (values.length < 1) {
      console.error(new Error('At least one value must be passed.'));
    }

    const steps: number[] = [];
    values.forEach(
      (value: string | number) => steps.push(this.scaleDriver.valueToStep(value, this.dataManager)),
    );

    if (isCorrectSteps(steps, this.dataManager)) {
      this.dataManager.pointSteps = steps;
      this._toggleUpdateEvent();
    } else {
      console.error(new Error(`[${values.join(',')}] values are not valid.`));
    }
  }

  public getPointPositions(): number[] {
    return getPointPositions(this.dataManager);
  }

  private _toggleUpdateEvent(): void {
    this.updateEventCallbackList.forEach(
      (callback) => callback(getPointPositions(this.dataManager)),
    );
  }
}

export default Model;
