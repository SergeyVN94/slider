const getAllSteps = function getAllSteps(scale: SliderScale, stepSize = 1): number {
    if (typeof scale[0] === 'string') {
        return scale.length - 1;
    }

    const [
        rangeMin,
        rangeMax,
    ] = scale as [number, number];
    return Math.floor((rangeMax - rangeMin) / stepSize);
};

const valueToStep = function valueToStep(
    value: string | number,
    dataManager: SliderModelDataManager
): number {
    const {
        scale,
        scaleType,
        stepSize,
    } = dataManager;

    if (scaleType !== typeof value) {
        console.error(new TypeError(`Unable to compute step "${value}". The value type should be the same as the slider scale.`));
        return -1;
    }

    if (scaleType === 'string') {
        return (scale as string[]).indexOf(value as string);
    }

    const [
        rangeMin,
        rangeMax,
    ] = scale as [number, number];

    if (value < rangeMin) {
        return -1;
    }

    if (value > rangeMax) {
        return -1;
    }

    return Math.round(((value as number) - rangeMin) / stepSize);
};

const updateStepSize = function updateStepSize(
    stepSize: number,
    dataManager: SliderModelDataManager
): void {
    const {
        scaleType,
        scale,
    } = dataManager;

    if (stepSize < 1) {
        console.error(new Error('Slider step size must be greater than 1.'));
    } else if (scaleType === 'string') {
        console.error(new Error('You cannot change the step size for a scale from strings.'));
    } else {
        const [
            rangeMin,
            rangeMax,
        ] = scale as [number, number];

        if (stepSize > (rangeMax - rangeMin)) {
            console.error(new Error('The step size should be less than the range of the slider.'));
        } else {
            dataManager.stepSize = stepSize;
        }
    }
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

const stepToValue = function stepToValue(
    step: number,
    dataManager: SliderModelDataManager,
): string | number | null {
    const {
        scale,
        steps,
        stepSize,
        scaleType,
    } = dataManager;

    if (step < 0) {
        console.error(new Error('Slider step size must be greater than 0.'));
        return null;
    }

    if (step > steps) {
        console.error(new Error('The step exceeds the maximum number of steps for a given slider scale.'));
        return null;
    }

    if (scaleType === 'string') {
        return (scale as string[])[step];
    }

    const [rangeMin] = scale as [number, number];
    return (step * stepSize) + rangeMin;
};

const getPointStates = function getPointStates(
    dataManager: SliderModelDataManager
): SliderPointState[] {
    const {
        pointSteps,
        steps,
    } = dataManager;

    const pointStates: SliderPointState[] = [];

    pointSteps.forEach((pointStep) => {
        pointStates.push({
            position: pointStep / steps,
            value: stepToValue(pointStep, dataManager),
        });
    });

    return pointStates;
};

const getModelValues = function getModelValues(
    dataManager: SliderModelDataManager
): number[] | string[] {
    const {
        pointSteps,
        scaleType,
    } = dataManager;

    if (scaleType === 'string') {
        return pointSteps.map<number>((step): number => {
            return stepToValue(step, dataManager) as number;
        });
    }

    return pointSteps.map<string>((step): string => {
        return stepToValue(step, dataManager) as string;
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
    dataManager: SliderModelDataManager
): boolean {
    if (values.length < 1) {
        console.error(new Error('At least one value must be passed.'));
    }

    const steps: number[] = [];
    values.forEach((value: string | number) => {
        steps.push(valueToStep(value, dataManager));
    });

    if (isCorrectSteps(steps, dataManager)) {
        dataManager.pointSteps = steps;
        return true;
    }

    console.error(new Error(`[${values.join(',')}] values are not valid.`));

    return false;
};

export {
    getAllSteps,
    valueToStep,
    updatePointSteps,
    updateStepSize,
    getModelValues,
    setModelValues,
    getPointStates,
    stepToValue,
    isCorrectSteps,
};
