import { PointState } from '../view/types';
import AbstractModel from './AbstractModel';
import { ModelConfig } from './types';

class Model extends AbstractModel {
  constructor(config: ModelConfig) {
    super(config);
    this.setValues(config.values);
  }

  public getConfig(): ModelConfig & {
    scaleItems: PointState[];
  } {
    return {
      step: this.step,
      max: this.max,
      min: this.min,
      values: this.pointsSteps.map((step) => this.stepToValue(step)),
      scaleItems: this.getScale(),
    };
  }

  // public set config(config: ModelConfig) {
  //   this.min = config.min;
  // }

  private setValues(values: number[]): void {
    try {
      this.pointsSteps = values.map((value) => {
        const step = value - this.min;
        if (step < 0 || step > this.range) throw new Error(`The value '${value}' cannot be set for this scale.`);
        return step;
      }).sort((numA, numB) => (numA > numB ? 1 : -1));

      this.triggerUpdateEvent();
    } catch (error) {
      console.error(error);
    }
  }

  protected stepToValue(step: number): number {
    return step + this.min;
  }
}

export default Model;
