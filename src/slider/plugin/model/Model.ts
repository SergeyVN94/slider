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
    this.initConfig(config);

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
    this.lastStep = Model.calcLastStep(this.step, this.maxStep);
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

  public update(targetPosition: number, pointIndex?: number): boolean {
    const targetStep = Math.round(targetPosition * this.maxStep);

    if (typeof pointIndex !== 'number') {
      this.pointsSteps[this.findNearestPoint(targetPosition)] = this.adjustStep(targetStep);
      this.triggerUpdateEvent();
      return true;
    }

    if (this.pointsSteps.length === 1) {
      this.pointsSteps[0] = this.adjustStep(targetStep);
      this.triggerUpdateEvent();
      return true;
    }

    const currentPointStep = this.pointsSteps[pointIndex];
    if (targetStep === currentPointStep) return true;

    if (targetStep > currentPointStep) {
      if (pointIndex === this.pointsSteps.length - 1) {
        this.pointsSteps[pointIndex] = this.adjustStep(targetStep);
      } else {
        const stepPointRight = this.pointsSteps[pointIndex + 1];

        this.pointsSteps[pointIndex] = (targetStep > stepPointRight)
          ? stepPointRight
          : this.adjustStep(targetStep);
      }

      this.triggerUpdateEvent();
      return true;
    }

    if (pointIndex === 0) {
      this.pointsSteps[pointIndex] = this.adjustStep(targetStep);
      this.triggerUpdateEvent();
      return true;
    }

    const stepPointLeft = this.pointsSteps[pointIndex - 1];

    if (targetStep < stepPointLeft) this.pointsSteps[pointIndex] = stepPointLeft;
    else this.pointsSteps[pointIndex] = this.adjustStep(targetStep);
    this.triggerUpdateEvent();
    return true;    
  }

  public onUpdate(callback: HandlerModelUpdate): void {
    this.updateEventCallbackList.push(callback);
    this.triggerUpdateEvent();
  }

  public getPointsPositions(): number[] {
    return this.pointsSteps.map((pointStep) => pointStep / this.maxStep);
  }

  public get values(): string[] | number[] {
    return this.pointsSteps.map(
      (step) => this.scaleDriver.stepToValue(step),
    ) as string[] | number[];
  }

  public set values(values: string[] | number[]) {
    try {
      const steps: number[] = [];

      values.forEach((value: string | number) => {
        const step = this.scaleDriver.valueToStep(value);
        if (step === null) throw new Error(`The value '${value}' cannot be set for this scale.`);
        else steps.push(this.adjustStep(step));
      });

      this.pointsSteps = steps.sort((numA, numB) => (numA > numB ? 1 : -1));
      this.triggerUpdateEvent();
    } catch (error) {
      console.error(error);
    }
  }

  public getScaleItems(): ScaleItem[] {
    const steps = new Set<number>();
    for (let i = 0; i <= this.maxStep; i += 1) steps.add(this.adjustStep(i));

    return Array.from(steps).map((step) => ({
      position: step / this.maxStep,
      value: String(this.scaleDriver.stepToValue(step)),
    }));
  }

  private initConfig(config: {
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
      this.config.customScale = errorCheckingCustomScale ? DEFAULT_CONFIG.customScale : customScale;

      if (errorCheckingCustomScale) {
        console.error(errorCheckingCustomScale);
        console.warn('Set a custom scale by default.');
      }
    } else {
      const errorCheckingMinMax = Model.checkMinMax(min, max);
      if (errorCheckingMinMax) console.error(errorCheckingMinMax);

      this.config.min = Math.min(min, max);
      this.config.max = Math.max(min, max);

      if (this.config.min === this.config.max) {
        this.config.max += DEFAULT_CONFIG.range;
        console.warn(`The maximum value of the slider is increased by ${DEFAULT_CONFIG.range}.`);
      }     
    }

    const errorCheckingStep = this.config.customScale 
      ? Model.checkStepForCustomScale(step, this.config.customScale)
      : Model.checkStepForMinMax(step, this.config.min, this.config.max);

    this.config.step = errorCheckingStep ? DEFAULT_CONFIG.step : step;

    if (errorCheckingStep) {
      console.error(errorCheckingStep);
      console.warn('Default step set.');
    }
  }

  private triggerUpdateEvent(): void {
    this.updateEventCallbackList.forEach(
      (callback) => callback(this.getPointsPositions()),
    );
  }

  private static calcLastStep(step: number, maxStep: number): number {
    const lastStep = Math.round((maxStep / step)) * step;
    return (lastStep > maxStep) ? maxStep : lastStep;
  }

  private findNearestPoint(targetPosition: number): number {
    const distancesToPoints = this.pointsSteps.map(
      (step) => Math.abs((step / this.maxStep) - targetPosition)
    );
    const minDistance = Math.min(...distancesToPoints);

    // т.к на одной позиции может быть несколько точек, используется Set
    const stepsOfNearestPoints = Array.from(new Set(this.pointsSteps.filter(
      (step, index) => (distancesToPoints[index] === minDistance)
    )));
    
    const stepOfNearestPoint = Math.min(...stepsOfNearestPoints);


    return (stepOfNearestPoint / this.maxStep) < targetPosition 
      ? this.pointsSteps.lastIndexOf(stepOfNearestPoint)
      : this.pointsSteps.indexOf(stepOfNearestPoint);
  }

  private adjustStep(step: number): number {
    if (step < this.lastStep) {
      const targetStep = Math.round((step / this.step)) * this.step;
      return (targetStep > this.maxStep) ? this.maxStep : targetStep;
    }

    const targetStep = Math.round((step - this.lastStep) / (this.maxStep - this.lastStep));
    return targetStep ? this.maxStep : this.lastStep;
  }
}

export default Model;
