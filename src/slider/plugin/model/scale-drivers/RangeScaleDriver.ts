class RangeScaleDriver implements IScaleDriver {
  private readonly min: number;

  private readonly maxStep: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.maxStep = max - min;
  }

  public getMaxStep(): number {
    return this.maxStep;
  }

  public valueToStep(value: number): number | null {
    const step = value - this.min;
    if (step < 0 || step > this.maxStep) return null;
    return step;
  }

  public stepToValue(step: number): number | null {
    if (step < 0 || step > this.maxStep) return null;
    return step + this.min;
  }
}

export default RangeScaleDriver;
