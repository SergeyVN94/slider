const SCALE_TYPES = {
  STRING: 'string',
};

const getPointPositions = function getPointPositions(
  dataManager: IDataGateway,
): number[] {
  const {
    pointSteps,
    steps,
  } = dataManager;

  return pointSteps.map((pointStep) => pointStep / steps);
};

const getModelValues = function getModelValues(
  dataManager: IDataGateway,
  scaleDriver: ISliderScaleDriver,
): number[] | string[] {
  const {
    pointSteps,
    scaleType,
  } = dataManager;

  if (scaleType === SCALE_TYPES.STRING) {
    return pointSteps.map<number>(
      (step): number => scaleDriver.stepToValue(step, dataManager) as number,
    );
  }

  return pointSteps.map<string>(
    (step): string => scaleDriver.stepToValue(step, dataManager) as string,
  );
};

const isCorrectSteps = function isCorrectSteps(
  steps: number[],
  dataManager: IDataGateway,
): boolean {
  const { steps: maxSteps } = dataManager;
  let isCorrect = true;
  let lastStep = 0;

  steps.forEach((step): boolean => {
    if (step < 0) {
      isCorrect = false;
      return false;
    }

    if (step > maxSteps) {
      isCorrect = false;
      return false;
    }

    if (step < lastStep) {
      isCorrect = false;
      return false;
    }

    lastStep = step;

    return true;
  });

  return isCorrect;
};

export {
  getModelValues,
  getPointPositions,
  isCorrectSteps,
};
