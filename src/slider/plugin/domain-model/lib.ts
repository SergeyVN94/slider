const SCALE_TYPES = {
    STRING: 'string',
};

const updatePointStepsForNull = function updatePointStepsForNull(
    state: SliderViewState,
    dataManager: SliderModelDataManager
): boolean {
    const { targetPosition } = state;
    const {
        steps,
        pointSteps,
    } = dataManager;

    const targetStep = Math.round(targetPosition * steps);

    if (pointSteps.length === 1) {
        dataManager.pointSteps = [targetStep];
        return true;
    }

    let minDistance = Infinity;

    pointSteps.forEach((step) => {
        const distance = Math.abs((step / steps) - targetPosition);

        if (distance < minDistance) {
            minDistance = distance;
        }
    });

    const nearestPoints = pointSteps.filter((step) => {
        const distance = Math.abs((step / steps) - targetPosition);
        if (distance === minDistance) {
            return true;
        }

        return false;
    });

    if (nearestPoints.length === 1) {
        const index = pointSteps.indexOf(nearestPoints[0]);
        pointSteps[index] = targetStep;
        dataManager.pointSteps = pointSteps;
        return true;
    }

    let isAllPointsInOnePosition = true;
    const [tmpStep] = nearestPoints;

    nearestPoints.forEach((step) => {
        if (step !== tmpStep) {
            isAllPointsInOnePosition = false;
        }
    });

    if (isAllPointsInOnePosition) {
        if (targetStep > tmpStep) {
            const index = pointSteps.lastIndexOf(nearestPoints[0]);
            pointSteps[index] = targetStep;
        }

        if (targetStep < tmpStep) {
            const index = pointSteps.indexOf(nearestPoints[0]);
            pointSteps[index] = targetStep;
        }

        dataManager.pointSteps = pointSteps;
        return true;
    }

    if (!isAllPointsInOnePosition) {
        const index = pointSteps.lastIndexOf(tmpStep);
        pointSteps[index] = targetStep;
        dataManager.pointSteps = pointSteps;
        return true;
    }

    return true;
};

const updatePointStepsForPoint = function updatePointStepsForPoint(
    state: SliderViewState,
    dataManager: SliderModelDataManager
): boolean {
    const {
        targetPosition,
        pointSelected,
    } = state;

    const {
        pointSteps,
        steps,
    } = dataManager;

    const targetStep = Math.round(targetPosition * steps);
    const currentPointStep = pointSteps[pointSelected];

    if (targetStep === currentPointStep) {
        return true;
    }

    if (pointSteps.length === 1) {
        dataManager.pointSteps[0] = targetStep;
        return true;
    }

    if (targetStep > currentPointStep) {
        if (pointSelected === pointSteps.length - 1) {
            dataManager.pointSteps[pointSelected] = targetStep;
            return true;
        }

        const stepPointRight = pointSteps[pointSelected + 1];

        if (targetStep > stepPointRight) {
            dataManager.pointSteps[pointSelected] = stepPointRight;
            return true;
        }

        dataManager.pointSteps[pointSelected] = targetStep;
        return true;
    }

    if (pointSelected === 0) {
        dataManager.pointSteps[pointSelected] = targetStep;
        return true;
    }

    const stepPointLeft = pointSteps[pointSelected - 1];

    if (targetStep < stepPointLeft) {
        dataManager.pointSteps[pointSelected] = stepPointLeft;
        return true;
    }

    dataManager.pointSteps[pointSelected] = targetStep;
    return true;
};

const updatePointSteps = function updatePointSteps(
    state: SliderViewState,
    dataManager: SliderModelDataManager
): void {
    const { pointSelected } = state;

    if (pointSelected === -1) {
        updatePointStepsForNull(state, dataManager);
    } else {
        updatePointStepsForPoint(state, dataManager);
    }
};

const getPointStates = function getPointStates(
    dataManager: SliderModelDataManager,
    scaleDriver: SliderScaleDriver,
): SliderPointState[] {
    const {
        pointSteps,
        steps,
    } = dataManager;

    const pointStates: SliderPointState[] = [];

    pointSteps.forEach((pointStep) => {
        pointStates.push({
            position: pointStep / steps,
            value: scaleDriver.stepToValue(pointStep, dataManager),
        });
    });

    return pointStates;
};

const getModelValues = function getModelValues(
    dataManager: SliderModelDataManager,
    scaleDriver: SliderScaleDriver,
): number[] | string[] {
    const {
        pointSteps,
        scaleType,
    } = dataManager;

    if (scaleType === SCALE_TYPES.STRING) {
        return pointSteps.map<number>((step): number => {
            return scaleDriver.stepToValue(step, dataManager) as number;
        });
    }

    return pointSteps.map<string>((step): string => {
        return scaleDriver.stepToValue(step, dataManager) as string;
    });
};

const isCorrectSteps = function isCorrectSteps(
    steps: number[],
    dataManager: SliderModelDataManager
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

const setModelValues = function setModelValues(
    values: number[] | string[],
    dataManager: SliderModelDataManager,
    scaleDriver: SliderScaleDriver
): boolean {
    if (values.length < 1) {
        console.error(new Error('At least one value must be passed.'));
    }

    const steps: number[] = [];
    values.forEach((value: string | number) => {
        steps.push(scaleDriver.valueToStep(value, dataManager));
    });

    if (isCorrectSteps(steps, dataManager)) {
        dataManager.pointSteps = steps;
        return true;
    }

    console.error(new Error(`[${values.join(',')}] values are not valid.`));

    return false;
};

export {
    updatePointSteps,
    getModelValues,
    setModelValues,
    getPointStates,
    isCorrectSteps,
};
