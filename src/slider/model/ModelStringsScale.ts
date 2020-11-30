import AbstractModel from './AbstractModel';
import { ModelConfigWithStringsScale, PointState } from './types';

class ModelStringsScale extends AbstractModel {
  private readonly customScale: string[];

  constructor(config: ModelConfigWithStringsScale) {
    const { customScale, step, values } = config;

    super({
      min: 0,
      max: customScale.length - 1,
      step,
    });

    this.customScale = customScale;
    this.values = values;
  }

  public getConfig(): ModelConfigWithStringsScale & {
    scaleItems: PointState[];
  } {
    return {
      step: this.step,
      customScale: [...this.customScale],
      values: this.values,
      scaleItems: this.getScale(),
    };
  }

  // public set config(config: ModelConfigWithStringsScale) {
  //   if (config.customScale && config.customScale.length !== this.max) {
  //     this.max = config.customScale.length;
  //   }
  // }

  private get values(): string[] {
    return this.pointsSteps.map((step) => this.stepToValue(step));
  }

  private set values(values: string[]) {
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
