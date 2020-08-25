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
    this.pointsSteps = [];
    this.updateEventCallbackList = [];
    this._initConfig(config);

    const { values } = config;
    let correctValues: string[] | number[];

    this.scaleDriver = this.config.customScale
      ? new CustomScaleDriver(this.config.customScale)
      : new RangeScaleDriver(this.config.min, this.config.max);

    const errorCheckingValues = this.config.customScale
      ? Model.checkValuesForCustomScale(
        values as string[],
        this.config.customScale,
      )
      : Model.checkValuesForMinMax(
        values as number[],
        this.config.min,
        this.config.max,
      );

    if (errorCheckingValues) {
      console.error(errorCheckingValues);
      console.warn('Set the starting value based on the scale');
      correctValues = this.config.customScale
        ? [this.config.customScale[0]]
        : [this.config.min];
    } else {
      correctValues = values;
    }

    this.step = this.config.step;
    this.maxStep = this.scaleDriver.getMaxStep();
    this.lastStep = Model._calcLastStep(this.step, this.maxStep);
    this.values = correctValues;

    this.config.step = this.step;
  }

  public static checkCustomScale(scale: string[]): Error | undefined {
    if (scale.length < 2) return Error('The custom scale must have at least 2 values.');
    return undefined;
  }

  public static checkMinMax(min: number, max: number): Error | undefined {
    if (min === max) return Error('The min and max should not be equal.');
    if (max < min) return Error('The maximum value of the range must be greater than the minimum.');
    return undefined;
  }

  public static checkStepForCustomScale(step: number, scale: string[]): Error | undefined {
    if (step < 1) return RangeError('Step must be greater than or equal to 1.');
    if (step > (scale.length - 1)) return RangeError('Step exceeds the scale range.');
    return undefined;
  }

  public static checkStepForMinMax(step: number, min: number, max: number): Error | undefined {
    if (step < 1) return RangeError('Step must be greater than or equal to 1.');
    if (step > (max - min)) return RangeError('Step exceeds the scale range.');
    return undefined;
  }

  public static checkValuesForCustomScale(values: string[], scale: string[]): Error | undefined {
    if (values.length === 0) return Error('The values ​​array must not be empty');

    const incorrectValue = values.find((value) => !scale.includes(value));
    return incorrectValue
      ? RangeError(`The value "${incorrectValue}" was not found on this scale.`)
      : undefined;
  }

  public static checkValuesForMinMax(
    values: number[],
    min: number,
    max: number,
  ): Error | undefined {
    if (values.length === 0) return Error('The values ​​array must not be empty');

    const incorrectValue = values.find((value) => (value < min || value > max));
    return incorrectValue
      ? RangeError(`The value "${incorrectValue}" is outside the slider range.`)
      : undefined;
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
    const steps = new Set<number>();
    for (let i = 0; i <= this.maxStep; i += 1) steps.add(this._adjustStep(i));

    return Array.from(steps).map((step) => ({
      position: step / this.maxStep,
      value: String(this.scaleDriver.stepToValue(step)),
    }));
  }

  private _initConfig(config: {
    customScale?: string[];
    min?: number;
    max?: number;
    values: number[] | string[];
    step: number;
  }): void {
    const {
      customScale,
      min,
      max,
      step,
    } = config;

    this.config = { step: DEFAULT_CONFIG.step };

    if (customScale) {
      const errorCheckingCustomScale = Model.checkCustomScale(customScale);

      if (errorCheckingCustomScale) {
        console.error(errorCheckingCustomScale);
        this.config.customScale = DEFAULT_CONFIG.customScale;
        console.warn('Set a custom scale by default.');
      } else {
        this.config.customScale = customScale;
      }

      const errorCheckingStep = Model.checkStepForCustomScale(step, this.config.customScale);

      if (errorCheckingStep) {
        console.error(errorCheckingStep);
        this.config.step = DEFAULT_CONFIG.step;
        console.warn('Default step set.');
      } else {
        this.config.step = step;
      }
    } else {
      const errorCheckingMinMax = Model.checkMinMax(min, max);

      if (errorCheckingMinMax) {
        console.error(errorCheckingMinMax);

        this.config.min = Math.min(min, max);
        this.config.max = Math.max(min, max);

        if (this.config.min === this.config.max) {
          this.config.max += DEFAULT_CONFIG.range;
          console.warn(`The maximum value of the slider is increased by ${DEFAULT_CONFIG.range}.`);
        }
      } else {
        this.config.min = min;
        this.config.max = max;
      }

      const errorCheckingStep = Model.checkStepForMinMax(step, this.config.min, this.config.max);

      if (errorCheckingStep) {
        console.error(errorCheckingStep);
        this.config.step = DEFAULT_CONFIG.step;
        console.warn('Default step set.');
      } else {
        this.config.step = step;
      }
    }
  }

  private _triggerUpdateEvent(): void {
    this.updateEventCallbackList.forEach(
      (callback) => callback(this.getPointPositions()),
    );
  }

  private static _calcLastStep(step: number, maxStep: number): number {
    const lastStep = Math.round((maxStep / step)) * step;
    return (lastStep > maxStep) ? maxStep : lastStep;
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
