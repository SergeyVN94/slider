class NumberRangeScaleDriver implements ISliderScaleDriver {
  private readonly scale: [number, number];

  private readonly maxStep: number;

  constructor(scale: [number, number]) {
    this.scale = scale;
    const [rangeMin, rangeMax] = scale;
    this.maxStep = rangeMax - rangeMin;
  }

  public getMaxStep(): number {
    return this.maxStep;
  }

  public valueToStep(value: number): number {
    // eslint-disable-next-line no-restricted-globals
    if (typeof value !== 'number' || isNaN(value)) return null;
    const [rangeMin] = this.scale;
    const step = value - rangeMin;
    if (step < 0 || step > this.maxStep) return null;
    return step;
  }

  public stepToValue(step: number): number | null {
    if (step < 0 || step > this.maxStep) return null;
    const [rangeMin] = this.scale;
    return step + rangeMin;
  }
}

export default NumberRangeScaleDriver;