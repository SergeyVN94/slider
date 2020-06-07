class StringArrayScaleDriver implements ISliderScaleDriver {
  private readonly scale: string[];

  private readonly maxStep: number;

  constructor(scale: string[]) {
    this.scale = scale;
    this.maxStep = scale.length - 1;
  }

  getMaxStep(): number {
    return this.maxStep;
  }

  valueToStep(value: string): number {
    return this.scale.indexOf(value);
  }

  stepToValue(step: number): string | null {
    const isCorrectStep = (step >= 0) && (step <= this.maxStep);

    if (!isCorrectStep) {
      return null;
    }

    return this.scale[step];
  }
}

export default StringArrayScaleDriver;
