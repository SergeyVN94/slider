import CustomScaleDriver from './scale-drivers/CustomScaleDriver';
import RangeScaleDriver from './scale-drivers/RangeScaleDriver';
import DEFAULT_CONFIG from '../defaultConfig';

class Model implements IModel, IModelStateManager {
  private readonly updateEventCallbackList: HandlerModelUpdate[];

  private pointSteps: number[];

  private readonly maxStep: number;

  private readonly step: number;

  private readonly scaleDriver: IScaleDriver;

  private lastStep: number;

  private config: IModelConfig;

  constructor(config: {
    customScale?: string[];
    min?: number;
    max?: number;
    values: number[] | string[];
    step: number;
  }) {
    const {
      customScale,
      min,
      max,
      values,
      step,
    } = config;

    this.pointSteps = [];
    this.updateEventCallbackList = [];
    this.config = { step: 1 };
    let _values: string[] | number[];

    if (customScale && Model.checkCustomScale(customScale)) {
      this.scaleDriver = new CustomScaleDriver(customScale);
      this.config.customScale = customScale;
      this.step = Model.checkStepForCustomScale(step, customScale)
        ? step
        : DEFAULT_CONFIG.step;

      _values = Model.checkValuesForCustomScale(values as string[], customScale)
        ? values
        : customScale.slice(0);
    } else if (Model.checkMinMax(min, max)) {
      const _min = Math.min(min, max);
      const _max = Math.max(min, max);
      this.scaleDriver = new RangeScaleDriver(_min, _max);
      this.config.min = _min;
      this.config.max = _max;
      this.step = Model.checkStepForMinMax(step, _min, _max)
        ? step
        : DEFAULT_CONFIG.step;

      _values = Model.checkValuesForMinMax(values as number[], _min, _max)
        ? values
        : customScale.slice(0);
    } else {
      this.scaleDriver = new RangeScaleDriver(DEFAULT_CONFIG.min, DEFAULT_CONFIG.max);
      this.config.min = DEFAULT_CONFIG.min;
      this.config.max = DEFAULT_CONFIG.max;
      this.step = DEFAULT_CONFIG.step;

      _values = [DEFAULT_CONFIG.min];
    }

    this.maxStep = this.scaleDriver.getMaxStep();
    this._initLastStep();
    this.values = _values;

    this.config.step = this.step;
  }

  public static checkCustomScale(scale: string[]): boolean {
    if (scale.length < 2) return false;
    return true;
  }

  public static checkMinMax(min: number, max: number): boolean {
    if (min === max || max < min) return false;
    return true;
  }

  public static checkStepForCustomScale(step: number, scale: string[]): boolean {
    if (step < 1 || step > (scale.length - 1)) return false;
    return true;
  }

  public static checkStepForMinMax(step: number, min: number, max: number): boolean {
    if (step < 1) return false;
    if (step > (max - min)) return false;
    return true;
  }

  public static checkValuesForCustomScale(values: string[], scale: string[]): boolean {
    if (values.length === 0) return false;
    return values.every((value) => scale.includes(value));
  }

  public static checkValuesForMinMax(values: number[], min: number, max: number): boolean {
    if (values.length === 0) return false;
    return values.every((value) => (value >= min && value <= max));
  }

  public getConfig(): IModelConfig {
    return this.config;
  }

  public update(targetPosition: number, pointSelected: number): void {
    this._updatePointSteps(targetPosition, pointSelected);
    this._triggerUpdateEvent();
  }

  public onUpdate(callback: HandlerModelUpdate): void {
    this.updateEventCallbackList.push(callback);
    this._triggerUpdateEvent();
  }

  public getPointPositions(): number[] {
    return this.pointSteps.map((pointStep) => pointStep / this.maxStep);
  }

  public get values(): string[] | number[] {
    return this.pointSteps.map((step) => this.scaleDriver.stepToValue(step)) as string[] | number[];
  }

  public set values(values: string[] | number[]) {
    let isCorrectValues = true;
    const steps: number[] = [];

    values.forEach((value: string | number) => {
      const step = this.scaleDriver.valueToStep(value);
      if (step === null) {
        if (isCorrectValues) isCorrectValues = false;
        console.error(new Error(`The value '${value}' cannot be set for this scale.`));
      } else {
        steps.push(this._adjustStep(step));
      }
    });

    if (isCorrectValues) this.pointSteps = steps.sort((numA, numB) => (numA > numB ? 1 : -1));

    this._triggerUpdateEvent();
  }

  public getScaleItems(): ScaleItem[] {
    const items: ScaleItem[] = [];

    const steps = new Set<number>();
    for (let i = 0; i <= this.maxStep; i += 1) steps.add(this._adjustStep(i));

    steps.forEach((step) => {
      items.push({
        position: step / this.maxStep,
        value: String(this.scaleDriver.stepToValue(step)),
      });
    });

    return items;
  }

  private _triggerUpdateEvent(): void {
    this.updateEventCallbackList.forEach(
      (callback) => callback(this.getPointPositions()),
    );
  }

  private _initLastStep(): void {
    this.lastStep = Math.round((this.maxStep / this.step)) * this.step;
    if (this.lastStep > this.maxStep) this.lastStep = this.maxStep;
  }

  private _updatePointSteps(
    targetPosition: number,
    pointIndex: number,
  ): void {
    if (pointIndex === -1) {
      this._updateStepOfNearestPoint(targetPosition);
    } else {
      this._updatePointStep(targetPosition, pointIndex);
    }
  }

  private _updatePointStep(targetPosition: number, pointIndex: number): boolean {
    const targetStep = Math.round(targetPosition * this.maxStep);
    const currentPointStep = this.pointSteps[pointIndex];

    if (targetStep === currentPointStep) {
      return true;
    }

    if (this.pointSteps.length === 1) {
      this.pointSteps[0] = this._adjustStep(targetStep);
      return true;
    }

    if (targetStep > currentPointStep) {
      if (pointIndex === this.pointSteps.length - 1) {
        this.pointSteps[pointIndex] = this._adjustStep(targetStep);
        return true;
      }

      const stepPointRight = this.pointSteps[pointIndex + 1];

      if (targetStep > stepPointRight) {
        this.pointSteps[pointIndex] = stepPointRight;
        return true;
      }

      this.pointSteps[pointIndex] = this._adjustStep(targetStep);
      return true;
    }

    if (pointIndex === 0) {
      this.pointSteps[pointIndex] = this._adjustStep(targetStep);
      return true;
    }

    const stepPointLeft = this.pointSteps[pointIndex - 1];

    if (targetStep < stepPointLeft) {
      this.pointSteps[pointIndex] = stepPointLeft;
      return true;
    }

    this.pointSteps[pointIndex] = this._adjustStep(targetStep);
    return true;
  }

  private _updateStepOfNearestPoint(targetPosition: number): boolean {
    const targetStep = Math.round(targetPosition * this.maxStep);

    if (this.pointSteps.length === 1) {
      this.pointSteps[0] = this._adjustStep(targetStep);
      return true;
    }

    let minDistance = Infinity;

    this.pointSteps.forEach((step) => {
      const distance = Math.abs((step / this.maxStep) - targetPosition);

      if (distance < minDistance) {
        minDistance = distance;
      }
    });

    const nearestPoints = this.pointSteps.filter((step) => {
      const distance = Math.abs((step / this.maxStep) - targetPosition);
      if (distance === minDistance) {
        return true;
      }

      return false;
    });

    if (nearestPoints.length === 1) {
      const index = this.pointSteps.indexOf(nearestPoints[0]);
      this.pointSteps[index] = this._adjustStep(targetStep);
      return true;
    }

    let isAllPointsInOnePosition = true;
    const [tmpStep] = nearestPoints;

    nearestPoints.forEach((step) => {
      if (step !== tmpStep) {
        isAllPointsInOnePosition = false;
      }
    });

    if (isAllPointsInOnePosition) {
      if (targetStep > tmpStep) {
        const index = this.pointSteps.lastIndexOf(nearestPoints[0]);
        this.pointSteps[index] = this._adjustStep(targetStep);
      }

      if (targetStep < tmpStep) {
        const index = this.pointSteps.indexOf(nearestPoints[0]);
        this.pointSteps[index] = this._adjustStep(targetStep);
      }

      return true;
    }

    if (!isAllPointsInOnePosition) {
      const index = this.pointSteps.lastIndexOf(tmpStep);
      this.pointSteps[index] = this._adjustStep(targetStep);
      return true;
    }

    return true;
  }

  private _adjustStep(step: number): number {
    if (step < this.lastStep) {
      const targetStep = Math.round((step / this.step)) * this.step;

      if (targetStep > this.maxStep) {
        return this.maxStep;
      }

      return targetStep;
    }

    const targetStep = Math.round((step - this.lastStep) / (this.maxStep - this.lastStep));

    if (targetStep) {
      return this.maxStep;
    }

    return this.lastStep;
  }
}

export default Model;
