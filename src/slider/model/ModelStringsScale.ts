import AbstractModel from './AbstractModel';
import { ModelConfigWithStringsScale } from './types';

class ModelStringsScale extends AbstractModel {
  private readonly customScale: string[];

  constructor(config: ModelConfigWithStringsScale) {
    const { customScale, step } = config;

    super({
      min: 0,
      max: customScale.length - 1,
      step,
    });

    this.customScale = customScale;
  }

  public get values(): string[] {
    return this.pointsSteps.map((step) => this.customScale[step]);
  }

  public set values(values: string[]) {
    try {
      this.pointsSteps = values.map((value: string): number => {
        const step = this.customScale.indexOf(value);
        if (step === -1) throw new TypeError(`The value of '${value}' is incorrect`);
        return this.adjustStep(step);
      }).sort((numA, numB) => (numA > numB ? 1 : -1));
    } catch (error) {
      console.error(error);
    }
  }

  protected stepToValue(step: number): string {
    return this.customScale[step];
  }
}

export default ModelStringsScale;
