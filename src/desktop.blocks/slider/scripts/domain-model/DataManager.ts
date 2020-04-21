import {
  SliderScale,
  ISliderModelDataManager,
} from './Model';

class DataManager implements ISliderModelDataManager {
  private allSteps: number;

  private sliderScale: SliderScale;

  private currentStepSize: number;

  private currentPointSteps: number[];

  private sliderScaleType: 'string' | 'number';

  constructor(config: {
    stepSize: number;
    scale: SliderScale;
    steps: number;
    pointSteps: number[];
  }) {
    const {
      scale,
      steps,
      stepSize,
      pointSteps,
    } = config;

    this.sliderScale = scale;
    this.allSteps = steps;
    this.currentStepSize = stepSize;
    this.currentPointSteps = pointSteps;
    this.sliderScaleType = typeof scale[0] as 'string' | 'number';
  }

  public get stepSize(): number {
    return this.currentStepSize;
  }

  public set stepSize(step: number) {
    this.currentStepSize = step;
  }

  public get pointSteps(): number[] {
    return this.currentPointSteps;
  }

  public set pointSteps(steps: number[]) {
    this.currentPointSteps = steps;
  }

  public get scale(): SliderScale {
    return this.sliderScale;
  }

  public set scale(scale: SliderScale) {
    this.sliderScale = scale;
    this.sliderScaleType = typeof scale[0] as 'string' | 'number';
  }

  public get steps(): number {
    return this.allSteps;
  }

  public set steps(steps: number) {
    this.allSteps = steps;
  }

  public get scaleType(): 'number' | 'string' {
    return this.sliderScaleType;
  }
}

export default DataManager;
