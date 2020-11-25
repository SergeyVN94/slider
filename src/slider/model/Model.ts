import AbstractModel from './AbstractModel';

class Model extends AbstractModel {
  public get values(): number[] {
    return this.pointsSteps.map((step) => step + this.min);
  }

  public set values(values: number[]) {
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
