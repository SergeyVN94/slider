import DEFAULT_CONFIG from '../defaultConfig';
import CustomScaleDriver from './scale-drivers/CustomScaleDriver';
import RangeScaleDriver from './scale-drivers/RangeScaleDriver';

class Model implements IModel, IModelStateManager {
  private readonly updateEventCallbackList: HandlerModelUpdate[];

  private pointsSteps: number[];

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

    this.pointsSteps = [];
    this.updateEventCallbackList = [];
    this.config = { step: DEFAULT_CONFIG.step };
    let _values: string[] | number[];

    if (customScale && Model.checkCustomScale(customScale)) {
      this.scaleDriver = new CustomScaleDriver(customScale);
      this.config.customScale = customScale;
      this.step = Model.checkStepForCustomScale(step, customScale)
        ? step
        : DEFAULT_CONFIG.step;

      _values = Model.checkValuesForCustomScale(values as string[], customScale)
        ? values
        : [customScale[0]];
    } else {
      const _min = Math.min(min, max);
      let _max = Math.max(min, max);

      if (_min === _max) _max = _min + DEFAULT_CONFIG.range;

      this.scaleDriver = new RangeScaleDriver(_min, _max);
      this.config.min = _min;
      this.config.max = _max;
      this.step = Model.checkStepForMinMax(step, _min, _max)
        ? step
        : DEFAULT_CONFIG.step;

      _values = Model.checkValuesForMinMax(values as number[], _min, _max)
        ? values
        : [_min];
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
    return this.pointsSteps.map((pointStep) => pointStep / this.maxStep);
  }

  public get values(): string[] | number[] {
    return this.pointsSteps.map(
      (step) => this.scaleDriver.stepToValue(step),
    ) as string[] | number[];
  }

  public set values(values: string[] | number[]) {
    let areValuesCorrect = true;
    const steps: number[] = [];

    values.forEach((value: string | number) => {
      const step = this.scaleDriver.valueToStep(value);
      if (step === null) {
        if (areValuesCorrect) areValuesCorrect = false;
        console.error(new Error(`The value '${value}' cannot be set for this scale.`));
      } else {
        steps.push(this._adjustStep(step));
      }
    });

    if (areValuesCorrect) this.pointsSteps = steps.sort((numA, numB) => (numA > numB ? 1 : -1));

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
    if (pointIndex === -1) this._updateStepOfNearestPoint(targetPosition);
    else this._updatePointStep(targetPosition, pointIndex);
  }

  private _updatePointStep(targetPosition: number, pointIndex: number): boolean {
    const targetStep = Math.round(targetPosition * this.maxStep);
    const currentPointStep = this.pointsSteps[pointIndex];

    if (targetStep === currentPointStep) return true;

    if (this.pointsSteps.length === 1) {
      this.pointsSteps[0] = this._adjustStep(targetStep);
      return true;
    }

    if (targetStep > currentPointStep) {
      if (pointIndex === this.pointsSteps.length - 1) {
        this.pointsSteps[pointIndex] = this._adjustStep(targetStep);
        return true;
      }

      const stepPointRight = this.pointsSteps[pointIndex + 1];

      if (targetStep > stepPointRight) {
        this.pointsSteps[pointIndex] = stepPointRight;
        return true;
      }

      this.pointsSteps[pointIndex] = this._adjustStep(targetStep);
      return true;
    }

    if (pointIndex === 0) {
      this.pointsSteps[pointIndex] = this._adjustStep(targetStep);
      return true;
    }

    const stepPointLeft = this.pointsSteps[pointIndex - 1];

    if (targetStep < stepPointLeft) {
      this.pointsSteps[pointIndex] = stepPointLeft;
      return true;
    }

    this.pointsSteps[pointIndex] = this._adjustStep(targetStep);
    return true;
  }

  private _updateStepOfNearestPoint(targetPosition: number): boolean {
    const targetStep = Math.round(targetPosition * this.maxStep);

    if (this.pointsSteps.length === 1) {
      this.pointsSteps[0] = this._adjustStep(targetStep);
      return true;
    }

    let minDistance = Infinity;

    this.pointsSteps.forEach((step) => {
      const distance = Math.abs((step / this.maxStep) - targetPosition);

      if (distance < minDistance) minDistance = distance;
    });

    const nearestPoints = this.pointsSteps.filter((step) => {
      const distance = Math.abs((step / this.maxStep) - targetPosition);
      if (distance === minDistance) return true;
      return false;
    });

    if (nearestPoints.length === 1) {
      const index = this.pointsSteps.indexOf(nearestPoints[0]);
      this.pointsSteps[index] = this._adjustStep(targetStep);
      return true;
    }

    const [tmpStep] = nearestPoints;
    const areAllPointsInOnePosition = nearestPoints.every((step) => step === tmpStep);

    if (areAllPointsInOnePosition) {
      if (targetStep > tmpStep) {
        const index = this.pointsSteps.lastIndexOf(nearestPoints[0]);
        this.pointsSteps[index] = this._adjustStep(targetStep);
      }

      if (targetStep < tmpStep) {
        const index = this.pointsSteps.indexOf(nearestPoints[0]);
        this.pointsSteps[index] = this._adjustStep(targetStep);
      }

      return true;
    }

    if (!areAllPointsInOnePosition) {
      const index = this.pointsSteps.lastIndexOf(tmpStep);
      this.pointsSteps[index] = this._adjustStep(targetStep);
      return true;
    }

    return true;
  }

  private _adjustStep(step: number): number {
    if (step < this.lastStep) {
      const targetStep = Math.round((step / this.step)) * this.step;

      if (targetStep > this.maxStep) return this.maxStep;
      return targetStep;
    }

    const targetStep = Math.round((step - this.lastStep) / (this.maxStep - this.lastStep));

    if (targetStep) return this.maxStep;
    return this.lastStep;
  }
}

export default Model;
