import {
  HandlerModelUpdate,
  ModelConfig,
  PointState,
} from './types';

abstract class AbstractModel {
  private readonly updateEventCallbackList: HandlerModelUpdate[];

  protected pointsSteps: number[];

  protected max: number;

  protected min: number;

  protected step: number;

  protected range: number;

  // Последний целый шаг. Например min = 0, max = 10, step = 3. Тогда последний шаг - 9.
  protected lastStep: number;

  constructor(config: ModelConfig) {
    const {
      max,
      min,
      step = 1,
    } = config;

    this.updateEventCallbackList = [];
    this.pointsSteps = [];
    this.min = Math.min(min, max);
    this.max = Math.max(min, max);
    this.range = this.max - this.min;
    this.step = step;
    this.validateModelFields();
    this.lastStep = this.calcLastStep();
  }

  protected validateModelFields(): void {
    if (this.step < 1) {
      this.step = 1;
      console.error(RangeError('Step must be greater than or equal to 1.'));
      console.warn('Step is set to 1.');
    }

    const range = (this.max - this.min);
    if (this.step > range) {
      this.step = range;
      console.error(RangeError('Step exceeds the scale range.'));
      console.warn(`Step is set to ${range}.`);
    }
  }

  public update(targetPosition: number, pointIndex?: number): boolean {
    const targetStep = Math.round(targetPosition * this.range);

    if (typeof pointIndex !== 'number') {
      const index = this.findNearestPoint(targetPosition);
      this.pointsSteps[index] = this.adjustStep(targetStep);
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

  public getPointsStates(): PointState[] {
    return this.pointsSteps.map((step) => ({
      position: step / this.range,
      value: this.stepToValue(step),
    }));
  }

  public getScale(): PointState[] {
    const steps = new Set<number>();
    for (let i = 0; i <= this.range; i += 1) steps.add(this.adjustStep(i));

    return Array.from(steps).map((step) => ({
      position: step / this.range,
      value: this.stepToValue(step),
    }));
  }

  protected triggerUpdateEvent(): void {
    this.updateEventCallbackList.forEach(
      (callback) => callback(this.getPointsStates()),
    );
  }

  protected calcLastStep(): number {
    const lastStep = Math.round((this.range / this.step)) * this.step;
    return (lastStep > this.range) ? this.range : lastStep;
  }

  protected findNearestPoint(targetPosition: number): number {
    const distancesToPoints = this.pointsSteps.map(
      (step) => Math.abs((step / this.range) - targetPosition),
    );
    const minDistance = Math.min(...distancesToPoints);

    // т.к на одной позиции может быть несколько точек, используется Set
    const stepsOfNearestPoints = Array.from(new Set(this.pointsSteps.filter(
      (_, index) => (distancesToPoints[index] === minDistance),
    )));

    const stepOfNearestPoint = Math.min(...stepsOfNearestPoints);

    return (stepOfNearestPoint / this.range) < targetPosition
      ? this.pointsSteps.lastIndexOf(stepOfNearestPoint)
      : this.pointsSteps.indexOf(stepOfNearestPoint);
  }

  protected adjustStep(step: number): number {
    if (step < this.lastStep) {
      const targetStep = Math.round((step / this.step)) * this.step;
      return (targetStep > this.range) ? this.range : targetStep;
    }

    const targetStep = Math.round((step - this.lastStep) / (this.range - this.lastStep));
    return targetStep ? this.range : this.lastStep;
  }

  protected abstract stepToValue(step: number): string | number;
}

export default AbstractModel;
