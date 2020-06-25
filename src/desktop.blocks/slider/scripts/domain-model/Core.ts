class Core {
  private pointSteps: number[];

  private maxStep: number;

  private stepSize: number;

  private scaleDriver: ISliderScaleDriver;

  private lastStep: number;

  constructor(options: {
    stepSize: number;
    scaleDriver: ISliderScaleDriver;
  }) {
    const { stepSize, scaleDriver } = options;

    this.pointSteps = [];
    this.maxStep = scaleDriver.getMaxStep();
    this.stepSize = stepSize;
    this._initLastStep();
    this.scaleDriver = scaleDriver;
  }

  public updatePointSteps(
    targetPosition: number,
    pointIndex: number,
  ): void {
    if (pointIndex === -1) {
      this._updatePointStepsForNull(targetPosition);
    } else {
      this._updatePointStepsForPoint(targetPosition, pointIndex);
    }
  }

  public getPointPositions(): number[] {
    return this.pointSteps.map((pointStep) => pointStep / this.maxStep);
  }

  public get step(): number {
    return this.stepSize;
  }

  public set step(stepSize: number) {
    if (stepSize > 0 && stepSize <= this.maxStep) {
      const values = [...this.values] as string[] | number[];
      this.stepSize = stepSize;
      this._initLastStep();
      this.values = values;
    } else {
      console.error(new Error(`Invalid step size: ${stepSize}.`));
    }
  }

  public get values(): string[] | number[] {
    return this.pointSteps.map((step) => this.scaleDriver.stepToValue(step)) as string[] | number[];
  }

  public set values(values: string[] | number[]) {
    if (values.length === 0) {
      console.error(new Error('At least one value must be passed.'));
    }

    let isCorrectValues = true;
    const steps: number[] = [];

    values.forEach((value: string | number) => {
      const step = this.scaleDriver.valueToStep(value);
      if (step === null) {
        if (isCorrectValues) isCorrectValues = false;
        console.error(new Error(`The value '${value}' cannot be set for this scale.`));
      }

      steps.push(this._adjustStep(step));
    });

    if (isCorrectValues) this.pointSteps = steps;
  }

  public getMaxStep(): number {
    return this.maxStep;
  }

  public stepToValue(step: number): string {
    return String(this.scaleDriver.stepToValue(step));
  }

  public setScaleDriver(scaleDriver: ISliderScaleDriver): void {
    const pointPositions = this.getPointPositions();
    this.pointSteps.length = 0;
    this.scaleDriver = scaleDriver;
    this.maxStep = scaleDriver.getMaxStep();
    this._initLastStep();
    pointPositions.forEach((pos: number) => {
      const step = this._adjustStep(Math.round(pos * this.maxStep));
      this.pointSteps.push(step);
    });
  }

  private _initLastStep(): void {
    this.lastStep = Math.round((this.maxStep / this.stepSize)) * this.stepSize;
    if (this.lastStep > this.maxStep) this.lastStep = this.maxStep;
  }

  private _updatePointStepsForPoint(targetPosition: number, pointIndex: number): boolean {
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

  private _updatePointStepsForNull(targetPosition: number): boolean {
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
      const targetStep = Math.round((step / this.stepSize)) * this.stepSize;

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

export default Core;
