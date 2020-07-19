class StringArrayScaleDriver implements IScaleDriver {
  private readonly scale: string[];

  private readonly maxStep: number;

  constructor(scale: string[]) {
    this.scale = scale;
    this.maxStep = scale.length - 1;
  }

  public getMaxStep(): number {
    return this.maxStep;
  }

  public valueToStep(value: string): number | null {
    const step = this.scale.indexOf(value);
    if (step === -1) return null;
    return step;
  }

  public stepToValue(step: number): string | null {
    if (step < 0 || step > this.maxStep) return null;
    return this.scale[step];
  }
}

export default StringArrayScaleDriver;
