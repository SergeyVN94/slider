const driverScaleStringArray: ISliderScaleDriver = {
  getAllSteps(scale: string[]): number {
    return scale.length - 1;
  },

  valueToStep(value: string, dataManager: IDataGateway): number {
    const { scale } = dataManager;

    return (scale as string[]).indexOf(value);
  },

  isCorrectStepSize(scale: string[], stepSize: number): boolean {
    if (stepSize === 1) {
      return true;
    }

    return false;
  },

  stepToValue(step: number, dataManager: IDataGateway): string | null {
    const {
      scale,
      steps,
    } = dataManager;

    const isStepOutOfStepsRange = (step < 0) || (step > steps);

    if (isStepOutOfStepsRange) {
      return null;
    }

    return (scale as string[])[step];
  },
};

export default driverScaleStringArray;
