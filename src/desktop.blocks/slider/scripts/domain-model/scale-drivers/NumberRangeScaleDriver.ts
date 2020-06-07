class NumberRangeScaleDriver implements ISliderScaleDriver {
  private readonly scale: [number, number];

  private readonly maxStep: number;

  constructor(scale: [number, number]) {
    this.scale = scale;
    const [rangeMin, rangeMax] = scale;
    this.maxStep = rangeMax - rangeMin;
  }

  getMaxStep(): number {
    return this.maxStep;
  }

  valueToStep(value: number): number {
    const [rangeMin] = this.scale;
    return value - rangeMin;
  }

  stepToValue(step: number): number | null {
    const isCorrectStep = (step >= 0) && (step <= this.maxStep);

    if (!isCorrectStep) {
      return null;
    }

    const [rangeMin] = this.scale;
    return step + rangeMin;
  }
}

export default NumberRangeScaleDriver;
