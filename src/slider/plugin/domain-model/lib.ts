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

    const valueInRange =
        value < 0 ? Math.abs(value as number) : ((value as number) + Math.abs(rangeMin));

    return Math.round(
        valueInRange / stepSize
    );
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

// TODO: Доделать
const updateModel = function updateModel(
    state: SliderViewState,
    dataManager: SliderModelDataManager
): void {
    state;
    dataManager;
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

    if (step >= steps) {
        console.error(new Error('The step exceeds the maximum number of steps for a given slider scale.'));
        return null;
    }

    if (scaleType === 'string') {
        return (scale as string[])[step];
    }

    const [rangeMin] = scale as [number, number];
    return (step * stepSize) + rangeMin;
};

// TODO: Доделать
const getPointStates = function getPointStates(
    dataManager: SliderModelDataManager
): SliderPointState[] {
    dataManager;
    return [
        {
            position: 0.23423,
        },
    ];
};

// TODO: Доделать
const getModelValues = function getModelValues(
    dataManager: SliderModelDataManager
): number[] | string[] {
    dataManager;
    return [1, 2, 3];
};

// TODO: Доделать
const setModelValues = function setModelValues(
    values: number[] | string[],
    dataManager: SliderModelDataManager
): void {
    values;
    dataManager;
};

export {
    getAllSteps,
    valueToStep,
    updateModel,
    updateStepSize,
    getModelValues,
    setModelValues,
    getPointStates,
    stepToValue,
};
